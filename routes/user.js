import { Router } from 'express';
import {
  getUsers,
  getUser,
  getMe,
  updateMe,
  updateAvatar,
} from '../controllers/userController.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.get('/users/me', getMe);
router.patch('/users/me', updateMe);
router.patch('/users/me/avatar', updateAvatar);

export default router;
