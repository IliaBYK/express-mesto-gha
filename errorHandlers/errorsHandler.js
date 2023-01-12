import bundle from 'jsonwebtoken';
import pkg from 'mongoose';
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';
import HttpError from '../errors/HttpError.js';
import {
  NOT_FOUND_ERR_CODE,
  BAD_REQUEST_ERR_CODE,
  CONFLICT_ERROR,
  UNAUTHORIZED_ERR_CODE,
} from '../utils/errorsCodes.js';

const { Jwt } = bundle;
const { CastError, ValidationError } = pkg;

export default function errorsHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    const { code, message } = err;
    res.status(code).send({ message });
  } else if (err instanceof NotFoundError) {
    res.status(NOT_FOUND_ERR_CODE).send({ message: err.message });
  } else if (err instanceof BadRequestError) {
    res.status(BAD_REQUEST_ERR_CODE).send({ message: err.message });
  } else if (err instanceof CastError) {
    const { value, kind } = err;
    res.status(BAD_REQUEST_ERR_CODE).send({ message: `Value '${value}' is not valid ${kind}` });
  } else if (err instanceof ValidationError) {
    const { message } = err;
    res.status(BAD_REQUEST_ERR_CODE).send({ message });
  } else if (err instanceof Jwt.JsonWebTokenError) {
    res.status(UNAUTHORIZED_ERR_CODE).send({ message: err.message });
  } else if (err.code === 11000) {
    res.status(CONFLICT_ERROR).send({ message: 'Пользователь с такой почтой уже зарегистрирован' });
  } else {
    next(err);
  }
}
