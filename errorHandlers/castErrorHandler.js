import { Error } from 'mongoose';
<<<<<<< HEAD
import { NOT_FOUND_ERR_CODE } from '../utils/errorsCodes.js';
=======
import { BAD_REQUEST_ERR_CODE } from '../utils/errorsCodes.js';
>>>>>>> parent of 26d8d52... added url validation, fixed errors messages

// eslint-disable-next-line consistent-return
export default function castErrorHandler(err, req, res, next) {
  if (err instanceof Error.CastError) {
<<<<<<< HEAD
    return res.status(NOT_FOUND_ERR_CODE).send({ message: err.message });
=======
    return res.status(BAD_REQUEST_ERR_CODE).send({ message: err.message });
>>>>>>> parent of 26d8d52... added url validation, fixed errors messages
  }
  next(err);
}
