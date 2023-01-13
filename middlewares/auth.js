// eslint-disable-next-line import/no-import-module-exports
import { verify } from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

export default function auth(req, res, next) {
  try {
    const { cookie } = req.headers;

    if (!cookie || !cookie.startsWith('jwt')) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    const token = cookie.replace('jwt=', '');
    const payload = verify(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (err) {
    next(err);
  }
  next();
}
