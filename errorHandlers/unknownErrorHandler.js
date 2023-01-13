import { INTERNAL_SERVER_ERR_CODE } from '../utils/errorsCodes.js';
import { INTERNAL_MESSAGE } from '../utils/constants.js';

export default function unknownErrorHandler(err, req, res, next) {
  res.status(INTERNAL_SERVER_ERR_CODE).send({ message: INTERNAL_MESSAGE });
  next();
}
