import BadRequestError from '../errors/BadRequestError.js';
import { BAD_REQUEST_ERR_CODE } from '../utils/errorsCodes.js';

export default function badRequestErrorHandler(err, req, res, next) {
  if (err instanceof BadRequestError) {
    res.status(BAD_REQUEST_ERR_CODE).send({ message: err.message });
  } else {
    next(err);
  }
}
