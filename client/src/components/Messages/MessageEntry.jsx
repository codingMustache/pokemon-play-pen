import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {Avatar, Button} from '@mui/material';
import { Send } from '@mui/icons-material';

const UserMsg = styled.div`
  display: flex;
  gap: 50px;
  box-shadow: 0 0 2px;
  align-items: center;
  padding: 2px;
  border-radius: 5px;
  margin: 5px;
  padding-top: 5px;

`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  background-color: none;
`;

const Message = styled.div`
  position: relative;
  margin-left: 0px;
  padding-left: 0px;
  display: flex;
  width: 75%;
`;

const MessageEntry = ({ msg }) => {

  const [sender, setUser] = useState([]);
  const [loggedInUser, setLogged] = useState();

  useEffect(() => {
    axios.get('/api/user/findUserId' + msg.sender)
      .then((data)=> {
        const resArr = data.data.data;
        setUser(resArr[0]);
        return resArr[1];
      })
      .then(data => setLogged(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <UserMsg>
      <UserInfo>
        <Link to={`/userProfile:${msg.sender}`}>
          <Avatar
            src={sender.avatar}
            alt={sender.name}
            referrerpolicy="no-referrer"
          />
        </Link>
        <p>{sender.username}</p>
      </UserInfo>
      <Message>
        {msg.message}
      </Message>
      {loggedInUser !== Number(msg.sender) ?
        <Link to={'/compose:' + msg.sender} >
          <Button variant='contained' endIcon={<Send/>}>Reply</Button>
        </Link> :
        <></>}

    </UserMsg>
  );
};
export default MessageEntry;
