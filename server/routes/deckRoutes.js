const { addCard, getMarketCards } = require('../db/dbHelperFuncs.js');

const { Router } = require('express');
const Deck = Router();

const axios = require('axios');
const header = {
  'api.pokemontcg.io-key': 'process.env.POKEMONTCG_API_KEY'
};

Deck.get('/', (req, res) => {
  // query param below for the request object from the front end
  axios.get(`https://api.pokemontcg.io/v2/cards?q=name:*${req.query.q}*`, header)
    .then(data => {
      const resArr = data.data.data.map((card) => {
        const resObj = {
          _id: card.id,
          name: card.name,
          images: {small: card.images.small}
        };
        return resObj;
      });
      return resArr;
    })
    .then(data => res.send(data));
});

Deck.get('/marketplaceCards', (req, res) => {
  getMarketCards((data) => res.status(200).send(data));
});

Deck.get('/firstFiftyCards', (req, res) => {
  // query param below for the request object from the front end
  axios.get('https://api.pokemontcg.io/v2/cards?pageSize=50', header)
    .then(data => {
      const resArr = data.data.data.map((card) => {
        const resObj = {
          _id: card.id,
          name: card.name,
          images: {small: card.images.small}
        };
        return resObj;
      });
      return resArr;
    })
    .then(data => res.send(data));
});

Deck.post('/', (req, res) => {
  const { q } = req.body.params;
  const cardObj = {
    cardId: q.id,
    userId: req.user._id,
    cardName: q.name,
    image: q.images.small
  };
  addCard(cardObj);
});

module.exports = { Deck };
