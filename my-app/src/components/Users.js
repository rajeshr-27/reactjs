import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';


function Users() {

	const [data,setData] = useState([]);
	const navigate = useNavigate();

	useEffect(() =>  {
		const fetchData = async () => {
			try{

				const response = await axios.get('http://localhost:4000/users');
				setData(response.data);

			}catch(error){
				console.log(error)
			}
		}

		fetchData();
		
	},[]);

	const deleteUser = async (id) => {
		  if(window.confirm('Are you sure you want to delete?')){
		  		try{
		  			  await axios.delete('http://localhost:4000/user/'+id);
		  			
		  			const response = await axios.get('http://localhost:4000/users');
					setData(response.data);
		  		}catch(error){
		  			console.log(error);
		  		}
		  }
		  return false;
	}
	return(
		<div className="container mt-3">
			<div className="row mb-5"> 
				<div className="col-sm-12">
				 	<div className="card">
					  <div className="card-header bg-info text-white">User List</div>
					  <div className="card-body">
					  	<table className="table table-bordered">
						    <thead>
						      <tr>
						        <th>Name</th> 
						        <th>Email</th> 
						        <th>Mobile Number</th>
						        <th>Gender</th>
						        <th>Country</th>
						        <th>Action</th>
						      </tr>
						    </thead>
						    <tbody>
						    { Array.isArray(data) && data.length > 0 ? (

							   	data.map(item => (
						    		<tr key={item._id}>
								        <td>{item.first_name} {item.last_name}</td> 
								        <td>{item.email}</td> 
								        <td>{item.mobile_no}</td> 
								        <td>{item.gender}</td> 
								        <td>{item.country}</td> 
								        <td><Link to={window.BASE_URL+"/register/"+item._id}>Edit</Link> | 
								        <Link  onClick={ () => deleteUser(item._id)}>Delete</Link> | 
								        	 <Link to={window.BASE_URL+"/user-details/"+item._id}>View</Link></td> 

								    </tr>
							    ))

						    	) : (
						    		<tr>
						    			<td colSpan="6">No Record Found</td>
						    		</tr>
						    	)
						}
						   {/* {data.map(item => (
					    		<tr key={item.id}>
							        <td>{item.first_name}</td> 
							      </tr>
						    ))}*/}
						      
						    </tbody>
						  </table>
					  </div>
					</div>
				</div>
			</div>
		</div>
		)
}

export default Users;