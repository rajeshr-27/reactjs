import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function UserDetails() {

	const [user,setUser] = useState('');
		const {id}= useParams();

	useEffect(() => {

		const fetchUserDetails = async () => { 
			const response = await axios.get('http://localhost:4000/user/'+id);
			setUser(response.data);
			try {

			}catch(error){
				console.log(error);
			}

		}

		fetchUserDetails(); 
	},[])

	return(
			<div className="container mt-3">
				<div className="row mb-5"> 
					<div className="col-sm-12">
					 	<div className="card">
					 		<div className="card-header">User Details <span className="float-end "><Link className="btn btn-sm btn-primary" to="/users">Back</Link></span></div>
					 		<div className="card-body">
					 			<div className="row">
						 			<div className="col-sm-6">
						 				<table className="table table-bordered">
										    <tbody>
										      	<tr>
											        <th>Name</th>
											        <td>{user.first_name} {user.last_name}</td>
											    </tr>
											    <tr>
											        <th>Email</th>
											        <td>{user.email}</td>
											    </tr>
											    <tr>
											        <th>Mobile Number</th>
											        <td>{user.mobile_no}</td>
											    </tr>
											    <tr>
											        <th>Gender</th>
											        <td>{user.gender}</td>
											    </tr>
											    <tr>
											        <th>Country</th>
											        <td>{user.country}</td>
											    </tr>
											    <tr>
											        <th>State</th>
											        <td>{user.state}</td>
											    </tr>
											    <tr>
											        <th>City</th>
											        <td>{user.city}</td>
											    </tr>
											    <tr>
											        <th>Address</th>
											        <td>{user.address}</td>
											    </tr>
											</tbody>
										</table>
									</div>
									<div className="col-sm-6">
										{ (user.photo) ?
												<img style={{ height: '124px', width: '124px'}} className="img-responsive" src={`http://localhost:4000/uploads/`+user.photo} />

												: '' }
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
}

export default UserDetails;