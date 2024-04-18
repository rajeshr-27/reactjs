import React, {useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchEmployees,clearMessage, deleteEmployee} from '../redux/features/employee/employeeSlice';

function EmployeeList() {

	const {employees,message} = useSelector((state)=> state.employee);
	const dispatch = useDispatch();
	

	useEffect(()=>{
		dispatch(fetchEmployees());
	}, [dispatch])	
	
	const handleDelete = (id) => {
		if(window.confirm('Are you sure you want to delete?')){
			dispatch(deleteEmployee(id))
		}
	}
	if(message){
		alert(message);
		dispatch(clearMessage())
	}
	return (

		<div className="container mt-3">
			<div className="card">
				<div className="card-header">EmployeeList <Link to={window.APP_URL+"/employee-frm"} className="float-end btn btn-sm btn-success">Add</Link></div>
				<div className="card-body">
					 <Table striped bordered hover>
					      <thead>
					        <tr>
					          <th>#</th>
					          <th>Name</th>
					          <th>Email</th>
					          <th>Mobile Number</th>
					          <th>Job</th>
					          <th>Action</th>
					        </tr>
					      </thead>
					      <tbody>
					      {
					      	Array.isArray(employees) && employees.map((item,index)=>(
					      		<tr key={item._id}>
						          <td>{index+1}</td>
						          <td>{item.employee_name}</td>
						          <td>{item.email}</td>
						          <td>{item.contact_number}</td>
						          <td>{item.job_title}</td>
						          <td>
							          <Link to={window.APP_URL+"/employee-view/"+item._id} className="btn btn-sm btn-info">View</Link>|
							           <Link to={window.APP_URL+"/employee-frm/"+item._id}  className="btn btn-sm btn-primary">Edit</Link>|
							          <Link onClick={() => handleDelete(item._id)} className="btn btn-sm btn-danger">Delete</Link>
							       </td>
						        </tr>
					      		))
					      }
					        
					       </tbody>
					</Table>
				</div>
			</div>
		</div>
		)
}

export default EmployeeList;