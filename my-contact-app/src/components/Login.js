import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Login() {

	const [frmData,setFrmData] = useState({
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
		const api_url = window.API_URL+'/users/login';

		//Login
		await axios.post(api_url,frmData).then(response => {
			alert(response.data.message);
			localStorage.setItem('token', response.data.accesstoken);
			navigate('/contacts',{replace:true})
		}).catch(error =>{
			alert(error.response.data.message);
		})
	}

	return(
			<div className="container">
				<div className="row mt-3">
					<div className="col-sm-4"></div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-header">Login</div>
							<div className="card-body">
								<Form onSubmit={handleSubmit}> 
								    <Form.Group className="mb-3">
								        <Form.Label>Email</Form.Label>
								        <Form.Control type="email" name="email" value={frmData.email} onChange={handleChange}  placeholder="Enter email" required />
								    </Form.Group>
								    <Form.Group className="mb-3">
								        <Form.Label>Password</Form.Label>
								        <Form.Control type="password" name="password" value={frmData.password}  onChange={handleChange}  placeholder="Enter password" required />
								    </Form.Group>
								    <Button variant="primary" className="float-end" type="submit">Submit</Button>
								</Form>
							</div>
						</div>
					</div>
					<div className="col-sm-4"></div>
				</div>
			</div>
		)
}

export default Login;