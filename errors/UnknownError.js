import { INTERNAL_SERVER_ERR_CODE } from '../utils/errorsCodes.js';

export default function unknownErrorHandler(error, reqг, res, next) {
  res.status(INTERNAL_SERVER_ERR_CODE).send({ message: 'Что-то пошло не так' });
  next();
}
