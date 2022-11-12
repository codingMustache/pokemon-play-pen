import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Profile from './components/userProfiles/profile.jsx';
import Collection from './components/cardCollection/collection.jsx';
import MarketPlace from './components/marketPlace/marketPlace.jsx';
import Pokedex from './components/pokedex/Pokedex.jsx';
import NavBar from './NavBar.jsx';
import NonUserProf from './components/userProfiles/nonUserProf.jsx';
import Inbox from './components/Messages/Inbox.jsx';
import Compose from './components/Messages/Compose.jsx';


// 
const App = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path ='/' element={<Profile />}/>
        <Route path='inbox' element={< Inbox/>} />
        <Route path='compose:id' element={<Compose/>}/>
        <Route path="marketPlace" element={<MarketPlace />} />
        <Route path="pokedex" element={<Pokedex />} />
        <Route path="collection" element={<Collection />} />
        <Route path="userProfile:id" element={ <NonUserProf /> } />
        <Route path='*' element={<Navigate to='/' replace />}/>        
      </Routes>
    </BrowserRouter>
  );
};




export default App;

