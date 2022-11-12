const db = require('mongoose');
const { obtainAllUsers, createUser, findUser, findUserById, changeUsername, changeDescription, addFavPokemon } = require('../db/dbHelperFuncs.js');
const { Router } = require('express');
const User = Router();
const axios = require('axios');

//retrieve all user data from schema
User.get('/current', (req, res) => { // get the currently logged in user
  res.status(200).send(req.user); // sends the google auth object from passport
});

User.get('/find', (req, res)=>{
  const user = req.query.name;
  findUser(user, (returnedUsers)=>{
    if (returnedUsers.length) {
      res.status(200).send(returnedUsers);
    } else {
      res.sendStatus(500);
    }
  });
});

User.get('/findUserId:id', (req, res) => { // get the user at the specified id
  findUserById(req.params.id, (userInfo)=>{
    if (userInfo) {
      res.status(200).send({data: [userInfo, req.user._id]});
    } else {
      res.sendStatus(404);
    }
  });
});

User.get('/current/pokemon/:id', (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}/`)
    .then(data => res.status(200).send(data.data))
    .catch(err => console.log(err, 'axios errrrr poke'));
});

User.patch('/name', (req, res) => { // change the username of the logged in user with the inputted username
  changeUsername(req.user._id, req.body.name);
  res.status(201).send('name changed');
});

User.patch('/description', (req, res) => { // change the description of the logged in user with the inputted new description
  changeDescription(req.user._id, req.body.data);
  res.status(201).send('desc changed');
});

User.post('/favpokemon/:id', (req, res) => {
  const { id } = req.params;
  addFavPokemon(req.user._id, id);
  res.status(201).send('work');
});



//post data to user schema to add a user
User.post('/', (req, res) => { // adds a user to the database useing the google auth object (i would hope)
  res.status(201).send();
});

// retrieve a user by its id

module.exports = { User };
