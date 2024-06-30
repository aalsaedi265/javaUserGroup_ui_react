
import React from 'react';
import {Routes, Route} from 'react-router-dom';
// import from index in components;
import { Home, GroupList, GroupEdit } from './components';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groups" element={<GroupList />} />
      <Route path="/groups/:id" element={<GroupEdit />} />
    </Routes>
  );
}

export default App;
