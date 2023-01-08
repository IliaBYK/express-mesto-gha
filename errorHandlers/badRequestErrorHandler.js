import BadRequestError from '../errors/BadRequestError.js';

export default function badRequestErrorHandler(err, req, res, next) {
  if (err instanceof BadRequestError) {
    res.status(400).send({ message: 'Карточка или пользователь не найден.' });
  } else {
    next(err);
  }
}
