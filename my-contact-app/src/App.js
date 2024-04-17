import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Contacts from './components/Contacts';
import ContactFrm from './components/ContactFrm';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
window.API_URL = 'http://localhost:5001/api';
window.BASE_URL = 'http://localhost:3000'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/contacts" element={<Contacts />} /> 
            <Route path="/contact-form" element={<ContactFrm />} />
            <Route path="/contact-form/:id" element={<ContactFrm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
