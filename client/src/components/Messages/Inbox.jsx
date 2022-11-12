import React, { useEffect, useState } from 'react';
import MessageList from './MessageList.jsx';
import axios from 'axios';
import Search from './Search.jsx';
import styled from 'styled-components';


const Header = styled.div`
  font-family:monospace;
  font-size: 5rem;
  display: flex;
  justify-content: center;
`;
const Body = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
`;


const Inbox = () => {

  const [msg, setMsg] = useState([]);

  const getInbox = () =>{
    axios.get('/api/chat')
      .then(data => setMsg(data.data))
      .catch(err => console.log(err));
  };

  useEffect(getInbox, []);

  return (
    <div>
      <Header>Inbox</Header>
      <Body>
        <MessageList msg={msg}/>
        <Search/>
      </Body>
    </div>
  );
};

export default Inbox;
