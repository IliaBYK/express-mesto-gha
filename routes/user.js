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

router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', updateMe);
router.patch('/me/avatar', updateAvatar);
router.post('/', postUser);
