import { Router } from 'express';
import {
  getUsers,
  getUser,
  getMe,
  updateMe,
  updateAvatar,
} from '../controllers/userController.js';
import { userValidationMe, userValidationAvatar, idValidation } from '../middlewares/validation.js';

const router = Router();

router.get('', getUsers);
router.get('/me', getMe);
router.patch('/me', userValidationMe, updateMe);
router.patch('/me/avatar', userValidationAvatar, updateAvatar);
router.get('/:id', idValidation, getUser);

export default router;
