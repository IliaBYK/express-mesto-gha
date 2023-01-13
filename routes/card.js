import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cardController.js';
import regExp from '../utils/constants.js';

const router = Router();

const idValidation = celebrate({
  params: {
    id: Joi.string().required().hex(/#([a-fA-F]|[0-9]){24}/),
  },
});

router.get('', getCards);
router.delete('/:id', idValidation, deleteCard);
router.post('', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().regex(regExp),
  }),
}), createCard);
router.put('/:id/likes', idValidation, likeCard);
router.delete('/:id/likes', idValidation, dislikeCard);

export default router;
