import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link,useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
function ContactFrm() {
	const [frmData,setFrmData] = useState({
		name:'',
		email:'',
		phone:''
	})

	const token = localStorage.getItem('token');
	const header = {
		headers : {
		Authorization : `Bearer ${token}`
		} 
	}
	const {id} = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if(id){
			const fetchData = async () => {

				const api_url = window.API_URL+'/contacts/'+id;

				//Fetch contact info
				await axios.get(api_url,header).then(response => {
					setFrmData(response.data);
				}).catch(error => {
					console.log(error.response.data.message);
				}) 
			}
			fetchData();
		}
	},[])

	const handleChange = (event) => {
		const {name,value} = event.target;
		setFrmData({
			...frmData,
			[name]:value
		})
	} 

	const handleSubmit = async (event) => {
		event.preventDefault();
		if(id){
			const api_url = window.API_URL+'/contacts/'+id;
			await axios.put(api_url,frmData,header).then(response => {
				alert(response.data.message);
				navigate('/contacts',{replace:true})
			}).catch(error => {
				alert(error.response.data.message);
			})
		}else {
			const api_url = window.API_URL+'/contacts/';
			await axios.post(api_url,frmData,header).then(response => {
				alert(response.data.message);
				navigate('/contacts',{replace:true})
			}).catch(error => {
				alert(error.response.data.message);
			})
		}		 
	}
	return(
			<div className="container">
				<div className="row mt-3">
					<div className="col-sm-4"></div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-header">Contact Form <span className="float-end"><Link className="btn btn-sm btn-warning" to="/contacts">Back</Link></span></div>
							<div className="card-body">
								<Form onSubmit={handleSubmit}>
								    <Form.Group className="mb-3">
								        <Form.Label>Name</Form.Label>
								        <Form.Control type="text" name="name" value={frmData.name} onChange={handleChange} placeholder="Enter name" required/>
								    </Form.Group>
								    <Form.Group className="mb-3">
								        <Form.Label>Email</Form.Label>
								        <Form.Control type="email" name="email" value={frmData.email} onChange={handleChange} placeholder="Enter email" required />
								    </Form.Group>
								    <Form.Group className="mb-3">
								        <Form.Label>Phone Number</Form.Label>
								        <Form.Control type="text" name="phone" value={frmData.phone} onChange={handleChange} placeholder="Enter Phone Number" required />
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

export default ContactFrm;