import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link, useNavigate, useParams} from 'react-router-dom';
import{useDispatch, useSelector} from "react-redux";
import {createEmployee,clearError, clearMessage , updateEmployee} from '../redux/features/employee/employeeSlice';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EmployeeFrm() {
	//Fetch id from url
	const {id} = useParams();
	//Fetch API URL from env file
	const API_URL =process.env.REACT_APP_API_URL; 
	
	// intialstate set for form
	const [frmData,setFrmData] = useState({
		employee_name:"",
		gender:"",
		marital_status:"",
		date_of_birth:"",
		education:"",
		job_title:"",
		height:"",
		id_number:"",
		contact_number:"",
		street_address:"",
		city:"",
		state:"",
		country:"",
		pincode:"",
		email:"",
		password:"",
		photo:""
	})
	
	//navigate function for redirect next screen
	const navigate = useNavigate();

	//dispatch for set actions
	const dispatch = useDispatch();
	// fetch updated state from redux
	const {message,error,employees} = useSelector((state)=>state.employee);

	//side effects of function component element
	useEffect(()=> {
		if(id){

			if(employees){
			 const employee = employees.find((employee)=>employee._id == id);
			 console.log(employee);
				setFrmData({
					employee_name:employee.employee_name,
					gender:employee.gender,
					date_of_birth:employee.date_of_birth,
					marital_status:employee.marital_status,
					education:employee.education,
					job_title:employee.job_title,
					height:employee.height,
					id_number:employee.id_number,
					contact_number:employee.contact_number,
					street_address:employee.street_address,
					city:employee.city,
					state:employee.state,
					country:employee.country,
					pincode:employee.pincode,
					email:employee.email,
					password:"",
					photo:employee.photo
				}) 
				
			}	
		}
	},[id])

	//form value update
	const handleChange = (e) => {
		const {name,value,files} = e.target;
		setFrmData({
			...frmData,
			[name] :(files)?files[0]:value
		})
	}

	//Register and update employee function
	const handleSubmit = async (e) => {
		e.preventDefault();
		 
		let postData = new FormData();
		postData.append('photo',frmData.photo);
		delete frmData.photo;		
		if(id){
			delete frmData.password
			postData.append('data',JSON.stringify(frmData));
			dispatch(updateEmployee({id,postData}));

		}else {
			postData.append('data',JSON.stringify(frmData));
			dispatch(createEmployee(postData)); 
		}
	}

	const handleDateChange = (date) => {

		const dob = formatDate(date);
		setFrmData({
			...frmData,
			date_of_birth:dob
		})
	}

	function formatDate(dateString) {
	  const date = new Date(dateString);
	  const year = date.getFullYear();
	  const month = (date.getMonth() + 1).toString().padStart(2, '0');
	  const day = date.getDate().toString().padStart(2, '0');
	  return `${day}-${month}-${year}`;
	}
	//redux error handling
	if(error){
		alert(error);
		dispatch(clearError());
	}

	//redux message handling
	if(message){
		alert(message);
		dispatch(clearMessage());
		navigate('/employee-list',{replace:true})
	}
	return( 
			<div className="container mt-3">
				<div className="row mb-3">
					<div className="col-sm-12">
						 <Link to={window.APP_URL+"/employee-list"}className="btn btn-sm btn-primary float-end">Back</Link>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="card">
							<div className="card-header">
								Employee Form
							</div>
							<div className="card-body">
								<Form onSubmit={handleSubmit} encType="multipart/form-data">
									<div className="row">
										<div className="col-sm-6">
											<Form.Group className="mb-3"  >
										        <Form.Label>Employee Name</Form.Label>
										        <Form.Control type="text" name="employee_name" value={frmData.employee_name} onChange={handleChange} placeholder="Employee Name" />
										    </Form.Group>
										    <Form.Group className="mb-3"  >
										        <Form.Label>Gender</Form.Label>
										        <Form.Control type="text" name="gender" value={frmData.gender} onChange={handleChange} placeholder="Gender" />
										    </Form.Group>
										    <Form.Group className="mb-3"  >
										        <Form.Label>Date Of Birth</Form.Label>
										        <DatePicker  
										        	showYearDropdown 
										        	dateFormat="dd-MM-yyyy" 
										        	scrollableMonthYearDropdown 
										        	maxDate={new Date()}
										        	name="date_of_birth"  selected={frmData.date_of_birth}   className="form-control" onChange={(date) => handleDateChange(date)}  placeholderText="dd-mm-yyyy" /> 
										    </Form.Group> 
										    <Form.Group className="mb-3"  >
										        <Form.Label>Marital Status</Form.Label>
										        <Form.Control type="text" name="marital_status" value={frmData.marital_status} onChange={handleChange} placeholder="Marital Status" />
										    </Form.Group>
										     <Form.Group className="mb-3"  >
										        <Form.Label>Education</Form.Label>
										        <Form.Control type="text" name="education" value={frmData.education} onChange={handleChange} placeholder="Education" />
										    </Form.Group>
										    <Form.Group className="mb-3"  >
										        <Form.Label>Job Title</Form.Label>
										        <Form.Control type="text" name="job_title" value={frmData.job_title} onChange={handleChange} placeholder="Job Title" />
										    </Form.Group>
										    <Form.Group className="mb-3"  >
										        <Form.Label>Height</Form.Label>
										        <Form.Control type="text" name="height" value={frmData.height} onChange={handleChange} placeholder="Height" />
										    </Form.Group>
										    <Form.Group className="mb-3"  >
										        <Form.Label>ID Number</Form.Label>
										        <Form.Control type="text" name="id_number" value={frmData.id_number} onChange={handleChange} placeholder="ID Number" />
										    </Form.Group>
										</div>
										<div className="col-sm-6">	
										<Form.Group className="mb-3"  >
										        <Form.Label>Contact Number</Form.Label>
										        <Form.Control type="text" name="contact_number" value={frmData.contact_number} onChange={handleChange} placeholder="Contact Number" />
										    </Form.Group>
										 <Form.Group className="mb-3"  >
										        <Form.Label>Street Address</Form.Label>
										        <Form.Control type="text" name="street_address" value={frmData.street_address} onChange={handleChange} placeholder="Street Address" />
										    </Form.Group>
										    <Form.Group className="mb-3"  >
										        <Form.Label>City</Form.Label>
										        <Form.Control type="text" name="city" value={frmData.city} onChange={handleChange} placeholder="City" />
										    </Form.Group>										
										    <Form.Group className="mb-3"  >
										        <Form.Label>State</Form.Label>
										        <Form.Control type="text" name="state" value={frmData.state} onChange={handleChange} placeholder="State" />
										    </Form.Group>
										     <Form.Group className="mb-3"  >
										        <Form.Label>Country</Form.Label>
										        <Form.Control type="text" name="country" value={frmData.country} onChange={handleChange} placeholder="Country" />
										    </Form.Group>
										     <Form.Group className="mb-3"  >
										        <Form.Label>Pincode</Form.Label>
										        <Form.Control type="text" name="pincode" value={frmData.pincode} onChange={handleChange} placeholder="Pincode" />
										    </Form.Group>
										     <Form.Group className="mb-3"  >
										        <Form.Label>Email</Form.Label>
										        <Form.Control type="text" name="email" value={frmData.email} onChange={handleChange} placeholder="Email" />
										    </Form.Group>
										    {!id && <Form.Group className="mb-3"  >
										        <Form.Label>Password</Form.Label>
										        <Form.Control type="password" name="password" value={frmData.password} onChange={handleChange} placeholder="Password" />
										    </Form.Group>}
										     
										    <Form.Group   className="mb-3">
										        <Form.Label>Profile Photo</Form.Label>
										        <Form.Control type="file"  name="photo"   onChange={handleChange}/>
										    </Form.Group>
										     <Form.Group   className="mb-3">
										         <Button className="float-end" variant="primary" type="submit">
												        Submit
												</Button>
										    </Form.Group>
										</div>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
}

export default EmployeeFrm;