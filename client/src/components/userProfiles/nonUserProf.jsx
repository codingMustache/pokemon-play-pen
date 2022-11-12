import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const NonUserProf = () => {
  //props.id is the id of the of the clicked user
  const id = Number(useLocation().pathname.split(':')[1]);
  const [profile, setProfile] = useState({});



  const retriveIdData = () => { // get the profile object data from db
    axios.get('/api/user/findUserId' + id)
      .then(data => {
        const userData = data.data.data[0];
        setProfile(userData); // give the profile state the profile object from database
      })
      .catch(err => console.log(err, 'ERROR ON GET CURRENT USER'));
  };

  useEffect(retriveIdData, []); // retrive data on render

  return (
    <div>
      <img alt={profile.firstName} width='100px' src={profile.avatar} referrerpolicy="no-referrer" /> <br />

      <h1>{profile.username}</h1>

      <h3>{profile.description}</h3>

      Favorite Pokemon:
      <div>
        <img src={profile.favPokemonImage} alt={profile.favPokemonName} width='90px' referrerpolicy='no-referrer' /> <br />
        <h2>
          {profile.favPokemonName}
        </h2>  <br />
        <ul>
          <li>{profile.favPokemonType1}</li>
          {profile.favPokemonType2 ? <li>{profile.favPokemonType2}</li> : <></>}
        </ul>
      </div>

    </div>
  );
};

export default NonUserProf;