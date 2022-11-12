import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const MarketEntries = ({ card }) => {


  return (
    <Card sx={{ maxWidth: 275 }}>
      <h2>{card.cardName}</h2>
      <CardMedia
        component='img'
        image={card.image}
        alt={`${card.cardName} was not found!`}
      />
      <CardContent>
      </CardContent >
      <CardActions>
        <Link to={'/compose:' + card.userId} >
          <Button variant='contained'>Contact User</Button>
        </Link>
      </CardActions >
    </Card >
  );
};

export default MarketEntries;
