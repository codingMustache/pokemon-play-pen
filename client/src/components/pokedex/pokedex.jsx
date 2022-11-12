import axios from 'axios';
import React, { useState } from 'react';
import Poke from './Poke.jsx';
import PokeInfo from './PokeInfo.jsx';
import Cards from './Cards.jsx';

const Pokedex = () => {
  const [selectedPoke, setSelectedPoke] = useState({});
  const [pokeStatus, setPokeStatus] = useState(false);
  const [selectedPokeId, setSelectedPokeId] = useState(0);
  const [pokeCards, setPokeCards] = useState([]);
  const [pokeCardDisplay, setPokeCardDisplay] = useState(false);

  //select pokemon to render info
  const selectPoke = (id) => {
    axios.get(`/api/pokedex/${id}`)
      .then(pokemon => {
        setSelectedPoke(pokemon.data);
        setSelectedPokeId(id);
        changePokeStatus(true);
      })
      .catch(err => console.log('Error Retrieving Pokemon', err));
  };

  //Get pokemon's cards
  const getCards = (pokeName) => {
    axios.get(`/api/pokedex/card/${pokeName}`)
      .then(pokemon => {
        setPokeCards(pokemon.data.data);
        changePokeCardDisplay(true);
      })
      .catch(err => console.log('Error Retrieving Pokemon Cards', err));
  };

  //change pokestatus view
  const changePokeStatus = (bool) => {
    setPokeStatus(bool);
  };

  const changePokeCardDisplay = (bool) => {
    setPokeCardDisplay(bool);
  };

  const renderView = () => {
    if (pokeStatus === true) {
      return <PokeInfo selectedPoke={selectedPoke} changePokeStatus={changePokeStatus} selectedPokeId={selectedPokeId} />;
    } else if (pokeCardDisplay === true) {
      return <Cards pokeCards={pokeCards} changePokeCardDisplay={changePokeCardDisplay} />;
    } else {
      return <Poke selectPoke={selectPoke} getCards={getCards} />;
    }
  };

  return (
    <div>
      <h1>The Pokédex!</h1>
      <div>
        <div>{renderView()}</div>
      </div>
    </div>
  );
};

export default Pokedex;
