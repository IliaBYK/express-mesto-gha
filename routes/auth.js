import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';
import { createUser, login } from '../controllers/userController.js';

const router = Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().regex(/^https?:\/\//i),
  }).unknown(true),
}), createUser);

export default router;
