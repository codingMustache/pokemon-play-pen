import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Avatar } from '@mui/material';
import {Send} from '@mui/icons-material';


const FoundUser = styled.div`
  display: flex;
  font-family: monospace;
  align-items: center;
  width: fit-content;
  margin: 5px;
  padding: .2rem;
  border-radius: 5px;
  gap: 1rem;
  border-style: solid;
  border-width: thin;
`;



const FoundUsers = props => {

  return (
    <FoundUser>
      <Avatar
        src={props.user.avatar}
        alt={props.user.name}
        width='50'
      />
      <p>{props.user.username}</p>
      <Link to={'/compose:' + props.user._id } >
        <Button variant='contained' endIcon={<Send/>}>Message</Button>
      </Link>
    </FoundUser>
  );
};
export default FoundUsers;
