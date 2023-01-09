import NotFoundError from '../errors/NotFoundError.js';
import { NOT_FOUND_ERR_CODE } from '../utils/errorsCodes.js';

export default function notFoundErrorHandler(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(NOT_FOUND_ERR_CODE).send({ message: err.message });
  } else {
    next(err);
  }
}
