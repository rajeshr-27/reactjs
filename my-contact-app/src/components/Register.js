import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Register() {

	const [frmData,setFrmData] = useState({
		username:"",
		email:"",
		password:""
	})

	const navigate = useNavigate();

	const handleChange = (event) => {
		const {name,value} = event.target;
		setFrmData({
			...frmData,
			[name]:value
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const api_url= window.API_URL+'/users/register';

		//Register
		await axios.post(api_url,frmData).
		then(response => {
			alert(response.data.message);
			navigate('/login',{replace:true})
		}).catch(error=>{			 
			alert(error.response.data.message);
		});
	}

	return(
			<div className="container">
				<div className="row mt-3">
					<div className="col-sm-4"></div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-header">User Form</div>
							<div className="card-body">
								<Form onSubmit={handleSubmit}>
								    <Form.Group className="mb-3">
								        <Form.Label>Username</Form.Label>
								        <Form.Control type="text" name="username" placeholder="Enter username" value={frmData.username} onChange={handleChange} required/>
								    </Form.Group>
								    <Form.Group className="mb-3">
								        <Form.Label>Email</Form.Label>
								        <Form.Control type="email" name="email" placeholder="Enter email" value={frmData.email} onChange={handleChange} required />
								    </Form.Group>
								    <Form.Group className="mb-3">
								        <Form.Label>Password</Form.Label>
								        <Form.Control type="password" name="password" placeholder="Enter password" value={frmData.password} onChange={handleChange} required />
								    </Form.Group>
								    <Button variant="primary" className="float-end" type="submit">Register</Button>
								</Form>
							</div>
						</div>
					</div>
					<div className="col-sm-4"></div>
				</div>
			</div>
		)
}

export default Register;