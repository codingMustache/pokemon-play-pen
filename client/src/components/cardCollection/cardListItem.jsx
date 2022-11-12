import React from 'react';
import axios from 'axios';
import Button from '@mui/material/button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const CardListItem = ({ card }) => {
  // console.log('card', card);
  const handleAddCard = card => {
    axios.post('/api/deck', { params: { q: card } })
      .catch(error => console.log(error));
  };

  return (
    <Card sx={{ maxWidth: 275 }}>
      <h2>{card.name}</h2>
      <CardMedia
        component='img'
        image={card.images.small}
        alt={`${card.name} was not found!`}
      />
      <CardContent>
      </CardContent >
      <CardActions>
        <Button variant='contained' onClick={() => { handleAddCard(card); }}>
          Add {card.name} to Marketplace
        </Button>
      </CardActions >
    </Card >
  );
};







export default CardListItem;