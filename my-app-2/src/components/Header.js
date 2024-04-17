import React from 'react';

import {Outlet, Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header () {

	return (
			<>
				 <Navbar expand="lg" className="bg-body-tertiary">
			      <Container>
			        <Navbar.Brand href="#home">Task</Navbar.Brand>
			        <Navbar.Toggle aria-controls="basic-navbar-nav" />
			        <Navbar.Collapse id="basic-navbar-nav">
			          <Nav className="me-auto">
			            <Link className="nav-link" to="/products">Products</Link>
			            
			            <NavDropdown title="Category" id="Category">
			              <NavDropdown.Item href="#action/3.1">Mobile</NavDropdown.Item>
			              <NavDropdown.Item href="#action/3.2">
			               Laptop
			              </NavDropdown.Item> 
			            </NavDropdown>
			          </Nav>
			        </Navbar.Collapse>
			      </Container>
				 </Navbar>
			 <Outlet />
			</>
		)
}

export default Header;