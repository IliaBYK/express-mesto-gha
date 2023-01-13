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

// middlewares/auth.js

/* // eslint-disable-next-line consistent-return
export default function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
} */
