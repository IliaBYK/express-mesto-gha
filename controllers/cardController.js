import Card from '../models/card.js';

export async function getCards(req, res, next) {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
}

export async function likeCard(req, res, next) {
  try {
    const cardLiked = Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    res.send(cardLiked);
  } catch (err) {
    next(err);
  }
}

export async function dislikeCard(req, res, next) {
  try {
    const cardDisliked = Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    res.send(cardDisliked);
  } catch (err) {
    next(err);
  }
}

export async function createCard(req, res, next) {
  try {
    let newCard = await Card.create({ ...req.body, ownrer: req.user._id });
    await newCard.save();
    newCard = await newCard.populate(['owner', 'likes']);
    res.status(200).send({ data: newCard });
  } catch (err) {
    next(err);
  }
}

export async function deleteCard(req, res, next) {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link });
    res.send({ data: newCard });
  } catch (err) {
    next(err);
  }
}
