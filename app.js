import express, { json, urlencoded } from 'express';
import { set, connect } from 'mongoose';
import { log } from 'console';
import { router as cardRoute } from './routes/card.js';
// eslint-disable-next-line import/named
import { router as userRoute } from './routes/user.js';
import badRequestErrorHandler from './errorHandlers/badRequestErrorHandler.js';
import castErrorHandler from './errorHandlers/castErrorHandler.js';
import notFoundErrorHandler from './errorHandlers/notFoundErrorHandler.js';
import validationErrorHandler from './errorHandlers/validationErrorHandler.js';
import errorHandler from './errorHandlers/ErrorHandler.js';
import unknownErrorHandler from './errorHandlers/unknownErrorHandler.js';
import NotFoundError from './errors/NotFoundError.js';
import { INTERNAL_SERVER_ERR_CODE } from './utils/errorsCodes.js';
// Слушаем 3000 порт
const { PORT = 3000, BASE_PATH = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(urlencoded({ extended: true }));

// eslint-disable-next-line consistent-return
async function startApp() {
  try {
    set('strictQuery', false);
    await connect(BASE_PATH);
    app.use(json());
    app.use((req, res, next) => {
      req.user = {
        _id: '63b2db00a3f30de9b3d9f112',
      };

      next();
    });
    app.use('/users', userRoute);
    app.use('/cards', cardRoute);
    app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));
    app.use(errorHandler);
    app.use(unknownErrorHandler);
  } catch (err) {
    if (err) {
      app.use((req, res) => res.status(INTERNAL_SERVER_ERR_CODE).send({ message: 'На сервере произошла ошибка' }));
    }
  }
}

startApp();

app.listen(PORT, () => {
  log(`App has been started on port ${PORT}...`);
});
