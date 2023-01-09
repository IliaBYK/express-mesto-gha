import User from '../models/user.js';
import NotFoundError from '../errors/NotFoundError.js';

export async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.send(users);
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

export async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
}

export async function postUser(req, res, next) {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    if (newUser === null) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send({ data: newUser });
  } catch (err) {
    next(err);
  }
}
