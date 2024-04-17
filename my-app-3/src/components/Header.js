import React from 'react';

import {Link,Outlet} from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {

	return(
		<>
			<Navbar expand="lg" className="bg-body-tertiary">
		      <Container>
		        <Navbar.Brand href="#home">Blogs</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="me-auto">
		            <Nav.Link href="#home">Home</Nav.Link>
		            <Link className="nav-link" to="/blog-list">Blogs</Link> 
		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>

		    <Outlet />
		</>
		)
}

export default Header;