import { Error } from 'mongoose';
import {
  BAD_REQUEST_ERR_CODE,
} from '../utils/errorsCodes.js';

export default function MongooseErrorHandler(err, req, res, next) {
  if (err instanceof Error.CastError) {
    return res.status(BAD_REQUEST_ERR_CODE).send({ message: err.message });
  } if (err instanceof Error.ValidationError) {
    return res.status(BAD_REQUEST_ERR_CODE).send({ message: err.message });
  }
  return next(err);
}
