import { Joi, celebrate } from 'celebrate';
import { regExp } from '../utils/constants.js';

export const userValidationMe = celebrate({
  body: Joi.object().keys({
    about: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

export const userValidationAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri().regex(regExp),
  }).unknown(true),
});

export const cardCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().regex(regExp),
  }),
});

export const idValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex(),
  }),
});
