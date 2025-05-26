import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register'
import Login from './components/Login'
import Create from './components/Create';
import Navbar from './components/NavBar';
import Edit from './components/Edit';
import Delete from './components/Delete';
// import AxiosInstance from './components/Axios';
import React, { useEffect } from 'react';
import AxiosInstance from './components/Axios';
// import cors from "cors";

function App() {
  
  const myWidth = 220
  const location = useLocation();

  const authRoutes = ['/login', '/register'];
  const authPage = authRoutes.includes(location.pathname);

  return (
    <div className="App">
      {authPage ? (
        // make login page separate
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      ) : (

        <Navbar 
          drawerWidth = {myWidth}
          content = {
            <Routes>
              <Route path="" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/create" element={<Create/>}/>
              <Route path="/edit/:id" element={<Edit/>}/>
              <Route path="/delete/:id" element={<Delete/>}/>
            </Routes>
          }
        
        />
      )}
    </div>
  );
}

export default App;
