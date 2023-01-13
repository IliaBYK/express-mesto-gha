import bundle from 'bcryptjs';
import pkg from 'jsonwebtoken';
import User from '../models/user.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { CREATED_CODE, OK_CODE_STATUS } from '../utils/errorsCodes.js';
import { WRONG_DATA_MESSAGE } from '../utils/constants.js';

const { compare, hash } = bundle;
const { sign } = pkg;

// с декораторами пока непросто, надо много прочитать, постараюсь освоить в ближайшее время
// спасибо за совет

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
      throw new UnauthorizedError(WRONG_DATA_MESSAGE);
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
