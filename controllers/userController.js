import bundle from 'bcryptjs';
import pkg from 'jsonwebtoken';
import User from '../models/user.js';
import NotFoundError from '../errors/NotFoundError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { CREATED_CODE, OK_CODE_STATUS } from '../utils/errorsCodes.js';

const { compare, hash } = bundle;
const { sign } = pkg;

export async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next, options) {
  try {
    req.body = options;
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
    });
    if (user === null) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
}

export async function updateMe(req, res, next) {
  const { name, about } = req.body;
  updateUser(req, res, next, { name, about });
}

export async function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  updateUser(req, res, next, { avatar });
}

export async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (user === null) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    const {
      name, about, avatar,
    } = req.body;
    let { email, password } = req.body;
    email = email.toLowerCase();
    password = await hash(password, 10);
    let user = await User.create({
      name, about, avatar, email, password,
    });
    user = JSON.parse(JSON.stringify(user));
    delete user.password;
    res.status(CREATED_CODE).send(user);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select('+password');

    if (user === null || !(await compare(password, user.password))) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const token = sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    user = JSON.parse(JSON.stringify(user));
    delete user.password;

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .status(OK_CODE_STATUS)
      .send({
        user,
      })
      .end();
  } catch (err) {
    next(err);
  }
}
