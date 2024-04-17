import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';
import axios from "axios";

function Contacts() {

	const [contacts,setContacts] = useState([]);
	const token = localStorage.getItem('token');
	const header = {
		headers : {
		Authorization : `Bearer ${token}`
		} 
	}

	useEffect(()=> {
		const fetchData = async () => {

			const api_url = window.API_URL+'/contacts';			
			await axios.get(api_url, header).then(response => {
				setContacts(response.data);
				//console.log(response.data);
			}).catch(error => {
				console.log(error.response.data.message);
			})
		}

		fetchData();
	},[]);

	const handleDelete = async (id) => {
		if(window.confirm('Are you sure you want to delete?')){
			try{
				const api_url = window.API_URL+'/contacts/'+id;	

				//Delete			
				await  axios.delete(api_url,header).then(response => {
					alert(response.data.message);
					setContacts(response.data.contacts);

				}).catch(error => {
					alert(error.response.data.message);
				})

			}catch(error){
				console.log(error)
			}
		}

	}
	return(
			<div className="container mt-3">
				<div className="card">
					<div className="card-header">Contacts<span className="float-end"><Link className="btn btn-sm btn-primary" to="/contact-form">Add</Link></span></div>
					<div className="card-body">
						<Table striped bordered hover>
						    <thead>
						        <tr>
						          <th>#</th>
						          <th>Name</th>
						          <th>Email</th>
						          <th>Phone</th>
						          <th>Action</th>
						        </tr>
						    </thead>
						    <tbody>
						    	{
						    		(Array.isArray(contacts) && contacts.length > 0) ?

						    		contacts.map((item,index) => (
						    			<tr key={item._id}>
								          <td>{index+1}</td>
								          <td>{item.name}</td>
								          <td>{item.email}</td>
								          <td>{item.phone}</td>
								          <td>
								          	<Link className="btn btn-sm btn-info" to={window.BASE_URL+'/contact-form/'+item._id}>Edit</Link> | 
								          	<Link className="btn btn-sm btn-danger" onClick={() => handleDelete(item._id)}>Delete</Link>
								          </td>
								        </tr>
						    		))						    		
							        : 
							        <tr>
							        	<td colSpan="5" className="text-center">No contacts found</td>
							        </tr>
						    	} 
						    </tbody>
						</Table>
					</div> 
				</div>
			</div>
		)
}

export default Contacts;
