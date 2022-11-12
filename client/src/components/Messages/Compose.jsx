import React, {useState} from 'react';
import { useLocation, Link} from 'react-router-dom';
import axios from 'axios';
import { Button, TextField} from '@mui/material';
import { Send } from '@mui/icons-material';
import styled from 'styled-components';


const Body = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding: 50px;
`;

const Compose = () => {
  const [message, setText] = useState('');
  //getting user Id from endpoint and parsing it
  const id = Number(useLocation().pathname.split(':')[1]);

  const setMsg = () => {
    if (message.length > 5 ) {
      axios.post('/api/chat', {
        text: message,
        to: id,
      })
        .catch(err=>console.log(err));
    }
  };

  return (
    <Body>
      <h2>
        Compose
      </h2>
      <TextField
        id="outlined-multiline-static"
        label="Message"
        multiline
        rows={7}
        defaultValue=""
        onChange={e=>setText(e.target.value)}
        type='text'
      />
      <Link to={'/inbox'} >
        <Button
          variant='contained'
          endIcon={<Send/>}>
        Send
        </Button>
      </Link>
    </Body>
  );
};

export default Compose;
