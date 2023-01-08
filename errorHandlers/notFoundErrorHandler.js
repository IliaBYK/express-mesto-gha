import NotFoundError from '../errors/NotFoundError.js';

export default function notFoundErrorHandler(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(404).send({ message: 'Карточка или пользователь не найден.' });
  } else {
    next(err);
  }
}
