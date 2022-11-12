import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';


const SearchForm = ({ setCards }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleOnSubmit = async e => {
    e.preventDefault();

    setCards([]);

    try {
      const { data } = await axios.get('/api/deck', { params: { q: searchTerm } });
      setCards(data);
      setSearchTerm('');
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    const getInitialCards = async () => {
      try {
        const { data } = await axios.get('/api/deck/firstFiftyCards');
        setCards(data);
      } catch (error) {
        console.error(error);
      }
    };
    getInitialCards();
  }, []);

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <TextField
          type="text"
          label="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <IconButton type='submit' variant='contained'>
          <SearchIcon style={{ fill: 'blue' }} />
        </IconButton>
      </div>
    </form>
  );
};

export default SearchForm;
