import mongoose from 'mongoose';
import HttpError from '../errors/HttpError.js';
import {
  BAD_REQUEST_ERR_CODE,
  CONFLICT_ERROR,
} from '../utils/errorsCodes.js';
import { CONFLICT_MESSAGE } from '../utils/constants.js';

export default function errorsHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    const { code, message } = err;
    res.status(code).send({ message });
  } else if (err instanceof mongoose.Error.CastError) {
    const { value, kind } = err;
    res.status(BAD_REQUEST_ERR_CODE).send({ message: `Value '${value}' is not valid ${kind}` });
  } else if (err instanceof mongoose.Error.ValidationError) {
    const { message } = err;
    res.status(BAD_REQUEST_ERR_CODE).send({ message });
  } else if (err.code === 11000) {
    res.status(CONFLICT_ERROR).send({ message: CONFLICT_MESSAGE });
  } else {
    next(err);
  }
}
