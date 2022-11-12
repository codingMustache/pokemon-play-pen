import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MarketEntries from './marketEntries.jsx';

const MarketPlace = () => {

  const [market, setMarket] = useState([]);

  useEffect(() => {
    axios.get('/api/deck/marketplaceCards')
      .then((data) => setMarket(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Marketplace</h1>
      <div>
        {market.map((card) => (
          < MarketEntries card={card} key={card._id} />
        ))}
      </div>
    </div>
  );
};

export default MarketPlace;