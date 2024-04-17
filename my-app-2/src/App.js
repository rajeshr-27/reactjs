import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Product from './components/Product';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

window.BASE_URL = 'http://localhost:3000';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route path="/products" element={<ProductList />} /> 
          <Route path="/product" element={<Product />} />  
          <Route path="/product/:id" element={<Product />} />     
          <Route path="/product-details/:id" element={<ProductDetails />} />      
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
