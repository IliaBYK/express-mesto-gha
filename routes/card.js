import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cardController.js';

const router = Router();

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCard);
router.put('/cards/:id/likes', likeCard);
router.delete('/cards/:id/likes', dislikeCard);

export default router;
