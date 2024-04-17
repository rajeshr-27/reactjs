import React from 'react';

import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails'

window.BASE_URL = 'http://localhost:3000';

function App() {
  return (
    <Router>
       <Routes>
          <Route path="/" element={<Header />}>
             <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<Blog />} />
             <Route path="/blog-list" element={<BlogList />} />
             <Route path="/blog-details/:id" element={<BlogDetails />} />
          </Route>
       </Routes>
    </Router>

  );
}

export default App;
