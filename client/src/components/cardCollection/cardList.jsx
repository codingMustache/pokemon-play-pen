import React from 'react';
import CardListItem from './cardListItem.jsx';

const CardList = ({ cards }) => {
  return cards.length > 0 ?
    (
      <ul>
        {cards && cards.map(card => <CardListItem card={card} />)}
      </ul>
    )
    : (
      <div>
        <h1></h1>
      </div>
    );
};

export default CardList;
