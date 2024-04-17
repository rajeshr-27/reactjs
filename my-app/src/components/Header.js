import react from 'react';
import { Outlet, Link }  from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

function Header() {

	return (
		<>
			 
			<Navbar bg="light" expand="lg">
				<div className="container-fluid">
		            <Navbar.Brand href="#home">Task</Navbar.Brand>
		            <Navbar.Toggle aria-controls="basic-navbar-nav" />
		            <Navbar.Collapse id="basic-navbar-nav">
		                <Nav className="me-auto">
		                    <Link className="nav-link" to="/users">Users</Link>
		                    <Link className="nav-link" to="/register">Register</Link>
		                     
		                    <Nav.Link href="#link">Login</Nav.Link> 
		                </Nav> 
		            </Navbar.Collapse>
		        </div>
	        </Navbar>
			 

			<Outlet />
		</>
	)
}

export default Header;;