import React, {useState} from 'react';
import axios from 'axios';
import FoundUsers from './FoundUsers.jsx';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';


const Input = styled.div`
display: flex;
justify-content: flex-end;
`;


const Search = () => {
  const [searched, setUsers] = useState([]);
  const [user, setSearch] = useState('');


  const findUser = ()=>{
    axios.get('/api/user/find', {params: {name: user}})
      .then(data=>setUsers(data.data))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Input>
        <TextField id="outlined-basic" label="Search Users" variant="outlined"
          onChange={e=>{
            setSearch(e.target.value);
            findUser();
          }} type="text" />
      </Input>
      {searched.map(user => (
        <FoundUsers
          user={user}
          key={user._id}
        />))}
    </div>
  );
};



export default Search;
