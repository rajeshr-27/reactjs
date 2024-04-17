import React, {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';

function StudentFrm() {
	const [frmData, setFrmData] = useState({
		first_name : '',
		last_name : '',
		email : '',
		mobile_number : '',
		gender : '',
		photo : '',
		address : '',
		dob : '',
		class_id : '',
		roll_no : '',
	});

	const [classList, setClassList] = useState([]);
	const {id} = useParams();
	const navigate = useNavigate();

	useEffect(()=> {

		const fetchClassData = async () => {
			await axios.get(window.API_URL+'/class').then((response) => {
				setClassList(response.data.classes);
			})

		}

		fetchClassData();

		if(id){
			const fetchData = async () => {
				await axios.get(window.API_URL+'/students/'+id).then((response) => {

					const student_details = response.data.student_details

					setFrmData({
						first_name : student_details.first_name,
						last_name : student_details.last_name,
						email : student_details.email,
						mobile_number : student_details.mobile_number,
						gender : student_details.gender,
						photo : student_details.photo,
						address : student_details.address,
						dob : student_details.dob,
						class_id : student_details.class_id._id,
						roll_no : student_details.roll_no,
					})
				}).catch((error)=> {
					console.log(error.response.data.message);
				})
			}

			fetchData();
		}

	}, [])



	const handleChange = (event) => {
		const {name,value,files} = event.target

		setFrmData({
			...frmData,
			[name]:(files) ? files[0] :value
		})

	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try{
			let postData = new FormData();
			postData.append('photo',frmData.photo)
			delete frmData.photo;
			postData.append('data', JSON.stringify(frmData));

			if(id){
				await axios.put(window.API_URL+'/students/'+id,postData).then((response) => {
					alert(response.data.message);
					navigate('/student-list', {replace:true})
				}).catch((error)=> {
					alert(error.response.data.message);
				})
			}else {
				await axios.post(window.API_URL+'/students',postData).then((response) => {
					alert(response.data.message);
					navigate('/student-list', {replace:true})
				}).catch((error)=> {
					alert(error.response.data.message);
				})
			}

			
		}catch(error){
			console.log(error)
		}
	}
	return (
			<div className="container">
				<div className="row mt-3">
					<div className="col-sm-4"></div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-header">Student Form</div>
							<div className="card-body">
								<Form onSubmit={handleSubmit} encType="multipart/form-data">
							      	<Form.Group className="mb-3">
							        	<Form.Label>First Name</Form.Label>
							        	<Form.Control type="text"  value={frmData.first_name} name="first_name" onChange={handleChange} placeholder="Enter first name" />				       
							      	</Form.Group> 
							      	<Form.Group className="mb-3">
							        	<Form.Label>Last Name</Form.Label>
							        	<Form.Control type="text"  value={frmData.last_name} name="last_name" onChange={handleChange} placeholder="Enter last name" />				       
							      	</Form.Group> 
							      	<Form.Group className="mb-3">
							        	<Form.Label>Email</Form.Label>
							        	<Form.Control type="email"  value={frmData.email} name="email" onChange={handleChange} placeholder="Enter email" />				       
							      	</Form.Group> 
							      	<Form.Group className="mb-3">
							        	<Form.Label>Mobile Number</Form.Label>
							        	<Form.Control type="text"  value={frmData.mobile_number} name="mobile_number" onChange={handleChange} placeholder="Enter mobile number" />				       
							      	</Form.Group>
							      	<Form.Select value={frmData.gender} name="gender" onChange={handleChange}>
							      		<Form.Label>Gender</Form.Label>
							      		<option value="">--Select Gender--</option>
							      		<option value="Male">Male</option>
							      		<option value="Female">Female</option>
							      	</Form.Select>
							      	<Form.Group className="mb-3">
							        	<Form.Label>Photo</Form.Label>
							        	<Form.Control type="file"   name="photo" onChange={handleChange} />				       
							      	</Form.Group> 
							      	<Form.Group className="mb-3">
								        <Form.Label>Address</Form.Label>
								        <Form.Control as="textarea" name="address" value={frmData.address} onChange={handleChange} rows={3} />
								    </Form.Group>
								    <Form.Group className="mb-3">
							        	<Form.Label>Date Of Birth</Form.Label>
							        	<Form.Control type="date"  value={frmData.dob} name="dob" onChange={handleChange} />				       
							      	</Form.Group> 
							      	<Form.Select value={frmData.class_id}  name="class_id" onChange={handleChange}>
							      	<Form.Label>Class</Form.Label>
								      	<option value="">--Select Class--</option>
								      	{
								      		(Array.isArray(classList) && classList.length >0) ?

								      		classList.map((item,index) => (
								      			<option value={item._id}>{item.class_name}</option>

								      		)) : ''
								      	} 
								    </Form.Select>
								    <Form.Group className="mb-3">
							        	<Form.Label>Roll No</Form.Label>
							        	<Form.Control type="text"  value={frmData.roll_no} name="roll_no" onChange={handleChange} />				       
							      	</Form.Group> 
							      	<Button variant="primary" className="float-end mt-3" type="submit">
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

export default StudentFrm; 