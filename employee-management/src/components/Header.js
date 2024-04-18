import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link,Outlet} from 'react-router-dom';

function Header() {

	return (
		<>
		<Navbar expand="lg" className="bg-body-tertiary">
	      <Container>
	        <Navbar.Brand href="#home">Employee-Management</Navbar.Brand>
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	          <Nav className="me-auto">
	            <Link to="employee-list" className="nav-link">Employees</Link>
	          </Nav>
	        </Navbar.Collapse>
	      </Container>
	    </Navbar>
	    <Outlet />
	    </>
		)
}

export default Header;