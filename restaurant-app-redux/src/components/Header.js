import React from 'react';
import {Link, Outlet} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cart from './Cart';
const Header = () => {

	return (
		<>
		 <Navbar expand="lg" className="bg-body-tertiary">
	      <Container>
	        <Navbar.Brand href="#home">Restaurant App</Navbar.Brand>
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	          <Nav className="me-auto">
	            <Link to="restaurant-list" className="nav-link">Home</Link>
	            <Link to="restaurant-frm" className="nav-link">Create Restaurant</Link>
	            <Link to="restaurant-list" className="nav-link">Restaurant List</Link>
	             
	          </Nav>
	        </Navbar.Collapse>
	      </Container>
	    </Navbar>
	    <Cart />
		 <Outlet />
		 </>
		)
}

export default Header;