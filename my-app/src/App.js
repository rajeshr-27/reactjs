import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header'
import Register from './components/Register'
import Users from './components/Users';
import UserDetails from './components/UserDetails'

window.BASE_URL = 'http://localhost:3000';

function App() { 

  return (
    <Router  >
        <Routes> 
            <Route path="/" element={<Header />} > 
                <Route path="/register" element={<Register />} />
                 <Route path="/register/:id" element={<Register />} />
                <Route path="/users" element={<Users />} />
                <Route path="/user-details/:id" element={<UserDetails />} />
            </Route>
        </Routes>
    </Router>
  );
}

export default App;
