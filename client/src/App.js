import React from 'react';
import Auth from './pages/Auth/index';
import Home from './pages/Home/index';
import {Route, Routes} from 'react-router-dom'
import { useSelector } from 'react-redux';


function App() {

  const isAuth = useSelector(state => state.users.isAuth);
  return (
    <div className='wrapper'>
      <Routes>
        <Route path="/" element={<Auth/>} />  
        <Route path="/login" element={<Auth/>} />  
        <Route path="/registration" element={<Auth/>} />  
        <Route path="/im" element={<Home/>} />  
      </Routes>
    </div>
  );
}

export default App;
