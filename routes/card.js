import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cardController.js';

const router = Router();

const idValidation = celebrate({
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  },
});

router.get('', idValidation, getCards);
router.post('', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().regex(/^https?:\/\//i),
  }),
}), createCard);
router.delete('/:id', idValidation, deleteCard);
router.put('/:id/likes', idValidation, likeCard);
router.delete('/:id/likes', idValidation, dislikeCard);

export default router;
