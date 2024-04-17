import React, {useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link,Outlet,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {logout} from '../slices/authSlice';


function Header(){

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {isLoggedIn, user} = useSelector((state)=> state.auth) 

  const handleLogout = () => {

    alert()
    dispatch(logout());
  //  AuthService.logout();
    //navigate('/user-login',{replace:true});
    navigate('/',{replace:true});
  }


	return(
    <>
		<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Student Result</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
              <Nav className="me-auto">
              {
                (isLoggedIn) ? (
                
                
                <NavDropdown title="Students" id="basic-nav-dropdown">
                    <Link className="dropdown-item" to={window.APP_URL+'/class-list'} >Class</Link>
                    <Link className="dropdown-item"  to={window.APP_URL+'/subject-list'} >Subject</Link>
                    <Link className="dropdown-item"  to={window.APP_URL+'/student-list'} >Student</Link>
                    <Link className="dropdown-item"  to={window.APP_URL+'/mark-list'} >Mark</Link>
                    
                    <Link className="dropdown-item"  to={window.APP_URL+'/users'} >Users</Link>
                </NavDropdown>
                 ) : ''
              }
              </Nav>
           
          <Nav className="mr-auto">
            {
                (isLoggedIn) ? (
                    <>
                    <NavDropdown title={user.name} id="basic-nav-dropdown">
                   
                        <Link className="dropdown-item" onClick={handleLogout} >Logout</Link>
                    </NavDropdown>
                     </>
                    ) : 
                    <>
                    <Link className="nav-link"  to={window.APP_URL+'/result'} >Result</Link>
                    <Link className="nav-link" to={window.APP_URL+'/user-frm'} >Register</Link>
                    <Link className="nav-link" to={window.APP_URL+'/user-login'} >Login</Link>
                    </>
                
            }
          
            
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Outlet />
    </>
	)
}

export default Header;

