import { verify } from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

export default function auth(req, res, next) {
  try {
    const { cookies } = req;
    const { jwt: token } = cookies;
    const payload = verify(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  next();
}
