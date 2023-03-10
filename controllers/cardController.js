import Card from '../models/card.js';
import NotFoundError from '../errors/NotFoundError.js';
import ForbiddenError from '../errors/ForbiddenError.js';
import { OK_CODE_STATUS } from '../utils/errorsCodes.js';
import { NOT_FOUND_CARD_MESSAGE, FORBIDDEN_MESSAGE } from '../utils/constants.js';

export async function getCards(req, res, next) {
  try {
    const cards = await Card.find({}).populate('owner likes');
    res.send(cards);
  } catch (err) {
    next(err);
  }
}

async function toggleLike(method, req, res, next) {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, {
      [method]: { likes: req.user._id },
    }, {
      new: true,
      runValidators: true,
    }).populate('owner likes');
    if (card === null) {
      throw new NotFoundError(NOT_FOUND_CARD_MESSAGE);
    }
    res.send(card);
  } catch (err) {
    next(err);
  }
}

export function likeCard(req, res, next) {
  return toggleLike('$addToSet', req, res, next);
}

export function dislikeCard(req, res, next) {
  return toggleLike('$pull', req, res, next);
}

export async function createCard(req, res, next) {
  try {
    let card = new Card({ ...req.body, owner: req.user._id });
    await card.save();
    card = await card.populate('owner likes');
    res.status(OK_CODE_STATUS).send(card);
  } catch (err) {
    next(err);
  }
}

export async function deleteCard(req, res, next) {
  try {
    const card = await Card.findById(req.params.id).populate('owner likes');
    if (card === null) {
      throw new NotFoundError(NOT_FOUND_CARD_MESSAGE);
    }
    if (card.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError(FORBIDDEN_MESSAGE);
    }
    await card.delete();
    res.send(card);
  } catch (err) {
    next(err);
  }
}
