import { verify } from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { UNAUTHORIZED_MESSAGE } from '../utils/constants.js';
import { UNAUTHORIZED_ERR_CODE } from '../utils/errorsCodes.js';

export default function auth(req, res, next) {
  try {
    const { cookies } = req;
    const { jwt: token } = cookies;
    if (!cookies || !token) {
      res.status(UNAUTHORIZED_ERR_CODE).send({ message: UNAUTHORIZED_MESSAGE });
      return;
    }
    const payload = verify(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
    return;
  }
  next();
}
