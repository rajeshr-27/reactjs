import React,{useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AuthService from './AuthService';
import{useNavigate, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {login, clearError} from '../slices/authSlice';

import {clearMessage} from '../slices/message';

import {toast} from 'react-toastify';

function UserLogin(){

	const [frmData,setFrmData] = useState({
		email:"",
		password:""
	})

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const {isLoggedIn,error} = useSelector((state) => state.auth);

	const {message} = useSelector((state) => state.message);

	useEffect(()=> {

		dispatch(clearMessage());

	},[dispatch])



	const handleChange = async (e) => {
		const {name,value} = e.target

		setFrmData({
			...frmData,
			[name] : value
		})
	}

	const token = localStorage.getItem('token');


	const handleSubmit = async (e) => {
		e.preventDefault();

		const {email,password} = frmData;
		 
		dispatch(login({email,password}))
	};

	if(error){
		alert(error);
		dispatch(clearError())
	}
	if(isLoggedIn){
		return <Navigate to="/users" />
	}

	return(

			<div className="container">
				<div className="row mt-3">
					<div className="col-sm-4"></div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-header">User Login</div>
							<div className="card-body">
								<Form onSubmit={handleSubmit}>
								 
							      	<Form.Group className="mb-3" controlId="formGroupEmail">
								        <Form.Label>Email address</Form.Label>
								        <Form.Control type="email" value={frmData.email}  onChange={handleChange}  name="email" placeholder="Enter email" />
							      	</Form.Group>
							      	<Form.Group className="mb-3" controlId="formGroupPassword">
								        <Form.Label>Password</Form.Label>
								        <Form.Control type="password" value={frmData.password}  onChange={handleChange}  name="password" placeholder="Password" />
							      	</Form.Group>
							      	<Button variant="primary" type="submit">
									        Submit
									</Button>
							    </Form>
							    {message && (
							    	<div className="form-group">
							    		<div className="alert alert-danger" role="alert">
							    			{message}
							    		</div>
							    	</div>
							    	)}
							</div>
						</div>
					</div>
				</div>
			</div>

		)
}

export default UserLogin;