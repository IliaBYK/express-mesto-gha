import express, { json, urlencoded } from 'express';
import { set, connect } from 'mongoose';
import { log } from 'console';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import limiter from './middlewares/limiter.js';
import router from './routes/index.js';
import unknownErrorHandler from './errorHandlers/unknownErrorHandler.js';
import errorsHandler from './errorHandlers/errorsHandler.js';
import { INTERNAL_SERVER_ERR_CODE } from './utils/errorsCodes.js';

dotenv.config();
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'jwtmestoauthorization';
}
// Слушаем 3000 порт
const { PORT = 3000, BASE_PATH = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(urlencoded({ extended: true }));

// eslint-disable-next-line consistent-return
async function startApp() {
  try {
    set('strictQuery', false);
    await connect(BASE_PATH);
    app.use(limiter);
    app.use(json());
    app.use(helmet());
    app.use('/', router);
    app.use(errorsHandler);
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
