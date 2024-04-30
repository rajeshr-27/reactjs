import React,{createContext,useContext, useState} from 'react'
import logo from './logo.svg';
import './App.css';

import RestaurantList from './components/RestaurantList';
import DishesMenu from './components/DishesMenu';
import Cart from './components/Cart';

function App() {
   
  return (
    <div className="App">
      <Cart style={{position:"absolute",right:"20px",top:"20px"}} />
      <RestaurantList />
      <DishesMenu />
    </div>
  );
}

export default App;
