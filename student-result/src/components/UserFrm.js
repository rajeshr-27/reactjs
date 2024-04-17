import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
function UserFrm() {

	const [frmData,setFrmData] =  useState({
		name:"",
		email:"",
		password:""
	})

	const {id} = useParams();

	const navigate = useNavigate();

	useEffect(()=> {

		if(id){
			const fetchData = async () => {
				await axios.get(window.API_URL+"/users/"+id).then( (response) => {
					setFrmData({
						name:response.data.userDetails.name,
						email:response.data.userDetails.email,
						password:response.data.userDetails.password,
					})

				})
			}

			fetchData();
		}

	},[])

	const handleChange = (e) => {
		const {name,value} = e.target;

		setFrmData({
			...frmData,
			[name]:value
		})
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		if(id){

			await axios.put(window.API_URL+"/users/"+id,frmData).then((response) => {

				alert(response.data.message);
				navigate('/users',{replace:true})
			}).catch((error)=> {
				alert(error.response.data.message);
			})

		}else {
			await axios.post(window.API_URL+'/users',frmData).then((response) => {
				alert(response.data.message);
				navigate('/users',{replace:true});
			}).catch((error) => {
				alert(error.response.data.message);
			})
		}
	
	}
	return (

			<div className="container">
				<div className="row mt-3">
					<div className="col-sm-4"></div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-header">User Register</div>
							<div className="card-body">
								<Form onSubmit={handleSubmit}>
									<Form.Group className="mb-3" controlId="formGroupEmail">
								        <Form.Label>Name</Form.Label>
								        <Form.Control type="text" value={frmData.name} onChange={handleChange} name="name" placeholder="Enter name" />
							      	</Form.Group>
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
							</div>
						</div>
					</div>
				</div>
			</div>

		)
}

export default UserFrm