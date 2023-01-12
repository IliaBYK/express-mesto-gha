import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';
import {
  getUsers,
  getUser,
  getMe,
  updateMe,
  updateAvatar,
} from '../controllers/userController.js';

const router = Router();

const idValidation = celebrate({
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  },
});

router.get('', getUsers);
router.get('/:id', idValidation, getUser);
router.get('/me', getMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
  }),
}), updateMe);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().regex(/^https?:\/\//i),
  }),
}), updateAvatar);

export default router;
