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

export async function updateMe(req, res, next) {
  try {
<<<<<<< HEAD
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
=======
    const { name, about } = req.body;
    const newMe = await User.findByIdAndUpdate(req.user._id, { name, about }, {
>>>>>>> parent of 26d8d52... added url validation, fixed errors messages
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

export async function updateAvatar(req, res, next) {
  try {
    const { avatar } = req.body;
    const newAvatar = await User.findByIdAndUpdate(req.user._id, { avatar }, {
      new: true,
      runValidators: true,
      upsert: true,
    });
    if (newAvatar === null) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(newAvatar);
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
