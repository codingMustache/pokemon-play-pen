const db = require('mongoose');
const { Deck, User, Chat } = require('./index.js');
const axios = require('axios');

const obtainAllUsers = function () {
  User.find({});
};

const createUser = function (data) {
  User.create(data);
};


const findUser = (user, cb) => {
  User.find({ username: { $regex: `${user}`, $options: 'i' }})
    .then(foundUsers => cb(foundUsers))
    .catch(err => console.log(err));
};

const findUserById = (id, cb) => {
  User.findById(id)
    .then(data => cb(data))
    .catch(err => console.log(err, 'find by id err'));
};

const changeUsername = (loggedInId, newName) => { //DOES NOT WORK
  User.findByIdAndUpdate(
    loggedInId,
    { username: newName })
    .then(data => data)
    .catch(err => console.log(err));
};

const changeDescription = (loggedInId, newDescription) => {
  User.findByIdAndUpdate(
    loggedInId,
    { description: newDescription })
    .then(data => data)
    .catch(err => console.log(err));
};

const addFavPokemon = (loggedInId, id) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(data => {
      const pokeData = data.data;
      User.findByIdAndUpdate(loggedInId, {
        favPokemonName: pokeData.species.name,
        favPokemonImage: pokeData.sprites.front_default,
        favPokemonType1: pokeData.types[0].type.name,
        favPokemonType2: pokeData.types[1] ? pokeData.types[1].type.name : ''
      })
        .then(data => data)
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err, 'axios errrrr poke'));

};

const addCard = (card, cb) => {
  Deck.create(card)
    .catch(error => console.log(error));
};

const getMarketCards = (cb) => {
  Deck.find({})
    .then((data) => cb(data))
    .catch((err) => console.log(err));
};

const addMessage = (chat, cb)=>{
  Chat.create(chat)
    .then(data => cb(data))
    .catch(err => console.log(err));
};

const getUsersMsg = (id, cb) => {
  Chat.find({ to: id, from: id })
    .then(data => cb(data))
    .catch(err => console.log(err));

};




module.exports = {
  obtainAllUsers,
  createUser,
  findUser,
  findUserById,
  changeUsername,
  changeDescription,
  addCard,
  addMessage,
  getUsersMsg,
  addFavPokemon,
  getMarketCards
};
