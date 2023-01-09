import NotFoundError from '../errors/NotFoundError.js';

export default function notFoundErrorHandler(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(404).send({ message: err.message });
  } else {
    next(err);
  }
}
