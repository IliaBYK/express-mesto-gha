import BadRequestError from '../errors/BadRequestError.js';
import {
  BAD_REQUEST_ERR_CODE,
  NOT_FOUND_ERR_CODE,
} from '../utils/errorsCodes.js';
import NotFoundError from '../errors/NotFoundError.js';

export default function HttpErrorHandler(err, req, res, next) {
  if (err instanceof NotFoundError) {
    return res.status(NOT_FOUND_ERR_CODE).send({ message: err.message });
  } if (err instanceof BadRequestError) {
    return res.status(BAD_REQUEST_ERR_CODE).send({ message: err.message });
  }
  return next(err);
}
