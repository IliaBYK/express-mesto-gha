import { INTERNAL_SERVER_ERR_CODE } from '../utils/errorsCodes.js';

export default function unknownErrorHandler(err, req, res, next) {
  res.status(INTERNAL_SERVER_ERR_CODE).send({ message: 'На сервере произошла ошибка' });
  next();
}