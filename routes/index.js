import { Router } from 'express';
import cardRouter from './card.js';
import userRouter from './user.js';
import authRouter from './auth.js';
import auth from '../middlewares/auth.js';
import NotFoundError from '../errors/NotFoundError.js';
import { NOT_FOUND_PAGE_MESSAGE } from '../utils/constants.js';

const router = Router();

router.use('/', authRouter);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', (req, res, next) => next(new NotFoundError(NOT_FOUND_PAGE_MESSAGE)));

export default router;
