import bcryptjs from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import User from '../models/user.js';
import NotFoundError from '../errors/NotFoundError.js';
import LogedError from '../errors/ConflictError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { OK_CODE_STATUS } from '../utils/errorsCodes.js';

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

async function updateUser(req, res, next) {
  try {
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
  req.body = { name, about };
  updateUser(req, res, next);
}

export async function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  req.body = { avatar };
  updateUser(req, res, next);
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
    const logedUser = await User.findOne({ email });
    if (logedUser !== null) {
      throw new LogedError('Пользователь с такой почтой уже зарегистрирован');
    }
    password = await bcryptjs.hash(password, 10);
    let user = await User.create({
      name, about, avatar, email, password,
    });
    if (user === null) {
      throw new NotFoundError('Пользователь не найден');
    }
    user = JSON.parse(JSON.stringify(user));
    delete user.password;
    res.send(user);
  } catch (err) {
    next(err);
  }
}

// eslint-disable-next-line consistent-return
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select('+password');

    if (user === null || !(await bcryptjs.compare(password, user.password))) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user = JSON.parse(JSON.stringify(user));
    delete user.password;

    /* res.send({ token }); */
    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .status(OK_CODE_STATUS)
      .send({
        message: 'Всё верно!',
        user,
      })
      .end();
  } catch (err) {
    next(err);
  }
}
