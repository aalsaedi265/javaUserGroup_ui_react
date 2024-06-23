
import React from 'react';
import {Routes, Route} from 'react-router-dom';
// import from index in components;
import { Home, GroupList } from './components';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groups" element={<GroupList />} />
    </Routes>
  );
}

export default App;
