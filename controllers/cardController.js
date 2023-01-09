import Card from '../models/card.js';
import NotFoundError from '../errors/NotFoundError.js';

export async function getCards(req, res, next) {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
}

// такое решение из-за ошибки: Converting circular structure to JSON

async function toggleLike(method, req, res, next) {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, {
      [method]: { likes: req.user._id },
    }, {
      new: true,
      runValidators: true,
    }).populate('owner likes');
    if (card === null) {
      throw new NotFoundError('Карточка не найдена');
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
    res.status(200).send(card);
  } catch (err) {
    next(err);
  }
}

export async function deleteCard(req, res, next) {
  try {
    const card = await Card.findById(req.params.id).populate('owner likes');
    if (card === null) {
      throw new NotFoundError('Карточка не найдена');
    }
    await card.delete();
    res.send(card);
  } catch (error) {
    next(error);
  }
}
