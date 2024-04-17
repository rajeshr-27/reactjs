import React, {useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import {Link} from 'react-router-dom';



function Users() {
 const [userList,setUserList] = useState([]);

 useEffect(() => {

 	const fetchData = async () => {
 		await axios.get(window.API_URL+'/users').then((response) => {

 			setUserList(response.data.userList);
 		})
 	}

 	fetchData();

 },[])

 const handleDelete = async (id) => {
 	if(window.confirm('Are you sure you want to delete?')){
 		 await axios.delete(window.API_URL+'/users/'+id).then((response) => {

 		 	alert(response.data.message);

 		 	setUserList(response.data.userList);
 		 }).catch((error)=> {
 		 	alert(error.response.data.message);
 		 })
 	}
 }
	return(
		<div className="container">
			<div className="row">
				<div className="col-sm-12">
					<div className="card">
						<div className="card-header">Mark List <Link className="btn btn-sm btn-primary float-end" to={window.APP_URL+'/mark-frm'}>Add</Link></div>
						<div className="card-body">
							 <Table striped bordered hover>
							      <thead>
							        <tr>
							          	<th>#</th>
							          	<th>Name</th>
							           	<th>Email</th> 
							          	<th>Action</th> 
							        </tr>
							      </thead>
							      <tbody>{
							      		(Array.isArray(userList) && userList.length > 0 ) ?
							      		userList.map((item, index ) => (
							      			<tr key={item._id}>
									      		<td>{index+1}</td>
									      		<td>{item.name}</td>
									      		<td>{item.email}</td>
									      		<td>
									      			<Link className="btn btn-primary btn-sm" to={window.APP_URL+'/user-frm/'+item._id} >Edit</Link> | 
									      			<Link onClick={() => handleDelete(item._id)} className="btn btn-danger btn-sm">Delete</Link>
									      		</td>
									      	</tr>
							      			))
							      		: ''
							      	}</tbody>
							</Table>
						</div>
					</div>
				</div>
			</div>
		</div>

		)
}

export default Users;