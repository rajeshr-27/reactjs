import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

function Register() {

	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		first_name:'',
		last_name:'',
		email:'',
		password:'',
		mobile_no:'',
		gender:'',
		country:'',
		state:'',
		city:'',
		address:'',
		photo:null
	});

	const {id} = useParams();

	if(id){

		console.log('update')

		

	}else {
		console.log('register');
	}

	 useEffect(() => {
	 	if(id){
 			const fetchUserDetails = async () => { 
				const response = await axios.get('http://localhost:4000/user/'+id);
				const userDetails = response.data;

				console.log(userDetails.first_name);
				setFormData({	
					...formData,
					first_name: userDetails.first_name,
					last_name: userDetails.last_name,
					email: userDetails.email,
					password: userDetails.password,
					mobile_no: userDetails.mobile_no,
					gender: userDetails.gender,
					country: userDetails.country,
					state: userDetails.state,
					city: userDetails.city,
					address: userDetails.address,
				})
				try {

				}catch(error){
					console.log(error);
				}
			}
			fetchUserDetails(); 
		} 
	 },[]);
	const handleInputChange = (event) => {
		
		 const {name, value, files} = event.target;
		 let fielddata = '';
		 if(files){
		 	fielddata = files[0];
		 }else {
		 	fielddata = value;
		 }
		 setFormData({
		 	...formData,
		 	[name]: fielddata
		 });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {

			let postData = new FormData();
			postData.append('photo',formData.photo);				 
			delete formData['photo'];				 
			postData.append('data',JSON.stringify(formData));
			 
			if(id){ 
				const response = await axios.put('http://localhost:4000/user/'+id, postData);

				if(response.data.status ==1){
					alert(response.data.message);
					navigate('/users', { replace: true });
				}else {
					alert(response.data.message);
					//history.push('/users');
					setFormData({
						...formData,
						email:''
					})
				}

				//console.log('Update: '+ response);
			}else {
				const response = await axios.post('http://localhost:4000/user', postData);

				if(response.data.status ==1){
					alert(response.data.message);
					navigate('/users', { replace: true });
				}else {
					alert(response.data.message);
					//history.push('/users');
					setFormData({
						...formData,
						email:''
					})
				}

				
				 
			} 
		}catch(error){
			console.log('Error', error);
		}
		 
	}

	return(
		<div className="container mt-3">
			<div className="row mb-5"> 
				<div className="col-sm-12">
				 	<div className="card">
					  <div className="card-header bg-info text-white">Register Form</div>
					  <div className="card-body">
					  	<form onSubmit={handleSubmit} encType="multipart/form-data"> 
					  		<div className="row">
						  		<div className="col-sm-6">
								    <div className="mb-3 mt-3">
								      <label htmlFor="first name">First Name: *</label>
								      	<input type="text" className="form-control"  placeholder="Enter first name" name="first_name" value={formData.first_name} onChange={handleInputChange} value={formData.first_name} onChange={handleInputChange} required />
								    </div>
								    <div className="mb-3 mt-3">
								      <label htmlFor="last name">Last Name:</label>
								      	<input type="text" className="form-control"  placeholder="Enter last name" name="last_name" value={formData.last_name} onChange={handleInputChange} />
								    </div>
								    <div className="mb-3 mt-3">
								      <label htmlFor="email">Email: *</label>
								      	<input type="email" className="form-control"  placeholder="Enter email" name="email" value={formData.email} onChange={handleInputChange} required />
								    </div>
								    <div className="mb-3 mt-3">
								      <label htmlFor="Password">Password: *</label>
								      	<input type="password" className="form-control"  placeholder="Enter password" name="password" value={formData.password} onChange={handleInputChange} required />
								    </div>

								    <div className="mb-3 mt-3">
								      <label htmlFor="Mobile number">Mobile Number: *</label>
								      	<input type="text" className="form-control"  placeholder="Enter mobile number" name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} required />
								    </div>
								    <div className="mb-3 mt-3">
								      <label htmlFor="Gender">Gender: *</label>
								      	<input type="text" className="form-control"  placeholder="Enter gender" name="gender" value={formData.gender} onChange={handleInputChange} required />
								    </div>	
								</div>
								<div className="col-sm-6">					    
								    <div className="mb-3 mt-3">
								      <label htmlFor="country">Country: *</label>
								      	<select className="form-select"   name="country"  value={formData.country} onChange={handleInputChange} required>
										    <option value="">---Select Country---</option>
										    <option value="India">India</option>
										    <option value="India">USA</option>
										    <option value="India">Australia</option>
										</select>
								    </div>
								    <div className="mb-3 mt-3">
								      <label 	htmlFor="state">State: *</label>
								      	<select className="form-select"  name="state"  value={formData.state} onChange={handleInputChange}  required>
										    <option value="">---Select State---</option>
										    <option value="Tamilnadu">Tamilnadu</option>
										    <option value="Karnataga">Karnataga</option> 
										</select>
								    </div>
								    <div className="mb-3 mt-3">
								      <label htmlFor="city">City: *</label>
								      	 <select className="form-select" name="city" value={formData.city} onChange={handleInputChange}  required>
										    <option value="">---Select City---</option>
										    <option value="Erode">Erode</option>
										    <option value="Chennai">Chennai</option> 
										</select>
								    </div>
								    <div className="mb-3 mt-3">
								      	<label htmlFor="address">Address: *</label>
								      	<textarea className="form-control" rows="3"    name="address" value={formData.address} onChange={handleInputChange}  required />						      	
								    </div> 
								    <div className="mb-3 mt-3">
								      	<label htmlFor="photo">Photo:</label>
								      	<input type="file" className="form-control" name="photo" onChange={handleInputChange} />
								    </div>
								    <div className="float-end">
								    	<button type="submit" className="btn btn-primary">Submit</button> 
								    </div>
								</div>
						    	
						    </div>
						</form>
					  </div> 
					</div>
				</div>
			</div>
		</div>
		)
}

export default Register;