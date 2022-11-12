const { Router } = require('express');
const Pokedex = Router();
const axios = require('axios');
const url = 'https://pokeapi.co/api/v2/pokemon/';

//GET ALL POKEMON NAMES
Pokedex.get('/', (req, res) => {
  axios
    .get(`${url}?limit=151`)
    .then((pokemon) => {
      res.status(202);
      res.send(pokemon.data.results);
    })
    .catch((err) => {
      console.log('Request for Pokemon Data FAILED:', err);
      res.sendStatus(500);
    });
});

//GET ONE POKEMAN OBJECT
Pokedex.get('/:pokemonId', (req, res) => {
  const { pokemonId } = req.params;

  axios
    .get(`${url}${pokemonId}/`)
    .then((pokemon) => {
      res.status(202);
      res.send(pokemon.data);
    })
    .catch((err) => {
      console.log('Request for Pokemon Data FAILED:', err);
      res.sendStatus(500);
    });
});

//GET POKEMON CARDS
Pokedex.get('/card/:pokemonName', (req, res) => {
  const { pokemonName } = req.params;

  axios
    .get(`https://api.pokemontcg.io/v2/cards?q=name:*${pokemonName}*`)
    .then((pokemon) => {
      res.status(202);
      res.send(pokemon.data);
    })
    .catch((err) => {
      console.log('Request for Pokemon Card Data FAILED:', err);
      res.sendStatus(500);
    });
});

//GET POKEMON CARDS
Pokedex.get('/card/:pokemonName', (req, res) => {
  const { pokemonName } = req.params;

  axios
    .get(`https://api.pokemontcg.io/v2/cards?q=name:*${pokemonName}*`)
    .then((pokemon) => {
      console.log(`Request for ${pokemonName} Cards Successful`);
      res.status(202);
      res.send(pokemon.data);
    })
    .catch((err) => {
      console.log('Request for Pokemon Card Data FAILED:', err);
      res.sendStatus(500);
    });
});


module.exports = { Pokedex };
