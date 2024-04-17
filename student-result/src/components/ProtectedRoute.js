import React from 'react';
import {Outlet,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
//import AuthService from './AuthService';

const ProtectedRoute = () => {
	const {isLoggedIn} = useSelector((state)=> state.auth);
	// console.log(isLoggedIn);
	return isLoggedIn ? <Outlet /> : <Navigate to="/user-login" />;
}

export default ProtectedRoute;