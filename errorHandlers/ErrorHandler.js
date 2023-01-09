import { Error } from 'mongoose';
import BadRequestError from '../errors/BadRequestError.js';
import {
  BAD_REQUEST_ERR_CODE,
  NOT_FOUND_ERR_CODE,
} from '../utils/errorsCodes.js';
import NotFoundError from '../errors/NotFoundError.js';

export default function errorHandler(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(NOT_FOUND_ERR_CODE).send({ message: err.message });
  } else if (err instanceof Error.CastError) {
    res.status(NOT_FOUND_ERR_CODE).send({ message: err.message });
  } else if (err instanceof BadRequestError || Error.ValidationError) {
    res.status(BAD_REQUEST_ERR_CODE).send({ message: err.message });
  } else {
    next(err);
  }
}
