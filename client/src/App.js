import React from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import { createBrowserHistory } from "history";

import Auth from './pages/Auth/index';
import Home from './pages/Home/index';
import CheckEmailInfo from './pages/Auth/components/CheckInfo';

function App() {
  const customHistory = createBrowserHistory();
  const navigate = useNavigate();

  return (
    <div className='wrapper'>
      <Routes>
        <Route exact path="/" element={<Auth/>} />  
        <Route exact path="/login" element={<Auth/>} />  
        <Route exact path="/registration" element={<Auth/>} />
        <Route exact strict path="/verify" element={<CheckEmailInfo history={customHistory} navigate={navigate}/>} />  
        <Route exact path="/im" element={<Home history={customHistory}/>} />  
        <Route exact path="/dialog/:id" element={<Home history={customHistory}/>} />
      </Routes>
    </div>
  );
}

export default App;
