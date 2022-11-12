import React, { useEffect, useState} from 'react';
import axios from 'axios';
import MessageEntry from './MessageEntry.jsx';
import styled from 'styled-components';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2.js';


const Body = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

`;


const MessageList = () => {

  const [msg, setMsg] = useState([]);

  const getInbox = () =>{
    axios.get('/api/chat')
      .then(data => setMsg(data.data))
      .catch(err => console.log(err));
  };

  useEffect(()=>{ getInbox(); }, []);

  return (
    <Grid2 container spacing={2} direction="column">
      <Body>
        {msg.map(msg=>(
          <MessageEntry
            msg={msg}
            key={msg._id}
          />
        ))}
      </Body>
    </Grid2>

  );
};
export default MessageList;
