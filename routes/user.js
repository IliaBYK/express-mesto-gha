import { Router } from 'express';
import {
  getUsers,
  getUser,
  updateMe,
  postUser,
  updateAvatar,
} from '../controllers/userController.js';

// eslint-disable-next-line import/prefer-default-export, global-require
export const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/me', updateMe);
router.patch('/users/me/avatar', updateAvatar);
router.post('/users', postUser);
