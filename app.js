import express, { json, urlencoded } from 'express';
import { set, connect } from 'mongoose';
import { log } from 'console';
import { router as cardRoute } from './routes/card.js';
// eslint-disable-next-line import/named
import { router as userRoute } from './routes/user.js';
import notFoundErrorHandler from './errorHandlers/notFoundErrorHandler.js';
import badRequestErrorHandler from './errorHandlers/badRequestErrorHandler.js';
import castErrorHandler from './errorHandlers/castErrorHandler.js';
import validationErrorHandler from './errorHandlers/validationErrorHandler.js';
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(urlencoded({ extended: true }));

// eslint-disable-next-line consistent-return
async function startApp() {
  try {
    set('strictQuery', false);
    await connect('mongodb://localhost:27017/mestodb');
    app.use(json());
    app.use((req, res, next) => {
      req.user = {
        _id: '63b2db00a3f30de9b3d9f112',
      };

      next();
    });
    app.use('/', userRoute);
    app.use('/', cardRoute);
    app.use(notFoundErrorHandler);
    app.use(badRequestErrorHandler);
    app.use(castErrorHandler);
    app.use(validationErrorHandler);
  } catch (err) {
    if (err) {
      app.use((req, res) => res.status(500).send({ message: 'Что-то пошло не так' }));
    }
  }
}

startApp();

app.listen(PORT, () => {
  log(`App has been started on port ${PORT}...`);
});
