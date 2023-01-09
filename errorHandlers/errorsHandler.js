import { Error } from 'mongoose';
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';
import {
  NOT_FOUND_ERR_CODE,
  BAD_REQUEST_ERR_CODE,
} from '../utils/errorsCodes.js';

export default function errorsHandler(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(NOT_FOUND_ERR_CODE).send({ message: err.message });
  } else if (err instanceof BadRequestError) {
    res.status(BAD_REQUEST_ERR_CODE).send({ message: err.message });
  } else if (err instanceof Error.CastError) {
    const { value, kind } = err;
    res.status(BAD_REQUEST_ERR_CODE).send({ message: `Value '${value}' is not valid ${kind}` });
  } else if (err instanceof Error.ValidationError) {
    res.status(BAD_REQUEST_ERR_CODE).send({ message: err.message });
  } else {
    next(err);
  }
}
