import { Error } from 'mongoose';
import { NOT_FOUND_ERR_CODE } from '../utils/errorsCodes.js';

// eslint-disable-next-line consistent-return
export default function castErrorHandler(err, req, res, next) {
  if (err instanceof Error.CastError) {
    return res.status(NOT_FOUND_ERR_CODE).send({ message: err.message });
  }
  next(err);
}
