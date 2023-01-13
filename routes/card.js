import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cardController.js';
import { cardCreateValidation, idValidation } from '../middlewares/validation.js';

const router = Router();

router.get('', getCards);
router.delete('/:id', idValidation, deleteCard);
router.post('', cardCreateValidation, createCard);
router.put('/:id/likes', idValidation, likeCard);
router.delete('/:id/likes', idValidation, dislikeCard);

export default router;
