import React from 'react';

import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import Footer from './Components/Footer';
import { UserStorage } from './UserContext';
import User from './Components/User/User';
import ProtectedRouter from './Components/Helpers/ProtectedRouter';
import Photo from './Components/Photo/Photo';
import UserProfile from './Components/User/UserProfile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <ProtectedRouter path="conta/*" element={<User />} />
            <Route path="foto/:id" element={<Photo />} />
            <Route path="perfil/:user" element={<UserProfile />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
