import { verify } from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

export default function auth(req, res, next) {
  try {
    const { cookie } = req.headers;
    const token = cookie.replace('jwt=', '');
    const payload = verify(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  next();
}
