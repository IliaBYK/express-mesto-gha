import { Router } from 'express';
// eslint-disable-next-line import/no-unresolved
import cardRouter from './card.js';
import userRouter from './user.js';
import authRouter from './auth.js';
import auth from '../middlewares/auth.js';
import NotFoundError from '../errors/NotFoundError.js';

const router = Router();

router.use('/', authRouter);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена!')));

export default router;
