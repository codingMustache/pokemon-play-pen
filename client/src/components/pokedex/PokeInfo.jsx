import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/button';

const Contents = styled.div`
  display: grid;
  grid-template-rows: 100%, 100%, 100%, 100%, 100%;
  grid-row-gap: 10px;
  justify-items: flex-start;
`;

const PokeInfo = ({ selectedPoke, changePokeStatus, selectedPokeId }) => {
  
  selectedPoke.name = selectedPoke.name.charAt(0).toUpperCase() + selectedPoke.name.slice(1);

  return (
    <div>
      <Button variant='contained' onClick={() => changePokeStatus(false)}>x</Button>  
      <Contents>
        <h3>{selectedPoke.name}</h3>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokeId}.png`} />

        <div>
          <h3>Type</h3>
          <div>{selectedPoke.types.map(pokemon => {
            return (
              <h4>{pokemon.type.name}</h4>
            );
          })}</div>
        </div>

        <div>
          <h3>Abilities</h3>
          <div>{selectedPoke.abilities.map(pokemon => {
            return (
              <h4>{pokemon.ability.name}</h4>
            );
          })}</div>
        </div>

        <div>
          <h3>Stats</h3>
          <ul>{selectedPoke.stats.map(pokemon => {
            return (
              <li>{pokemon.stat.name}: {pokemon.base_stat}</li>
            );
          })}</ul>
        </div>
      
      </Contents>
    </div>
  );
};

export default PokeInfo;


//pokemon name
//pokemon image
//pokemon type 
//pokemon abilities
//pokemon stats - hp, attack, defense, special-attack, special-defense, speed