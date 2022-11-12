
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const CardSect = styled.div`
  display: inline-block;
`;

// const Card = styled.div`
//   margin: 25px;
// `;

const PokeCard = styled.img`
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;

const Cards = ({ pokeCards, changePokeCardDisplay }) => {
  // const [cardToAdd, setCardToAdd] = useState({});

  const addCard = card => {
    console.log(card);

    axios.post('/api/deck', { params: { q: card } })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <Button variant='contained' onClick={() => changePokeCardDisplay(false)}>x</Button>
      <div>
        {pokeCards.map(card => {
          return (
            <Card sx={{ maxWidth: 275 }}>
              <h2>{card.name}</h2>
              <CardMedia
                component='img'
                image={card.images.small}
                alt={`${card.name} was not found!`}
              />
              <CardActions>
                <Button variant='contained' onClick={() => { handleAddCard(card); }}>
                  Add {card.name} to Marketplace
                </Button>
              </CardActions >
            </Card >
          );
        })}
      </div>
    </div>
  );
};



export default Cards;
