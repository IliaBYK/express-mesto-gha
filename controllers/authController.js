import bcryptjs from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import User from '../models/user.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';

// eslint-disable-next-line consistent-return
export default async function login(req, res, next) {
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
      .send(user)
      .end();
  } catch (err) {
    next(err);
  }
}
