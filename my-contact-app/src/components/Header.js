import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, Outlet} from 'react-router-dom';


function Header() {

	return(
		<>
			<Navbar expand="lg" className="bg-body-tertiary">
			      <Container>
			        <Navbar.Brand href="#home">Contacts Management App</Navbar.Brand>
			        <Navbar.Toggle aria-controls="basic-navbar-nav" />
			        <Navbar.Collapse id="basic-navbar-nav">
			          <Nav className="me-auto">
			            <Link className="nav-link" to="/register">Register</Link>
			             <Link className="nav-link" to="/login">Login</Link>
			            <NavDropdown title="Rajesh" id="basic-nav-dropdown">
			              <Link className="nav-link" to="/contacts">Contacts</Link>
			              <NavDropdown.Item href="/Logout">
			                Logout
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