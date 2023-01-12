import { verify } from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

export default function auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    const token = authorization.replace('Bearer ', '');
    const payload = verify(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (err) {
    next(err);
  }
  next();
}
