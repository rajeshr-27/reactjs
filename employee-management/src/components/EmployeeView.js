import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchEmployee} from "../redux/features/employee/employeeSlice";
function EmployeeView() {

	const [employee,setEmployee] = useState({});

	const {employees} = useSelector((state)=>state.employee);
	const dispatch = useDispatch();
	const {id} = useParams();

	useEffect(()=> {
		if(id){
			const singleEmployee = employees.find((employee) => employee._id == id);
			setEmployee(singleEmployee);
		}

	},[id])
	return(
			
			<div className="container  mt-3">
				<div className="row mb-3">
					<div className="col-sm-12">
						 <Link to={window.APP_URL+"/employee-list"} className="btn btn-sm btn-primary float-end">Back</Link>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-4">
						<div className="card">
							<div className="card-body text-center">
								<div className="photo mt-3">
								  {
								  	(employee.photo) ? 

								  	 <img src={process.env.REACT_APP_API_IMG_URL+"/"+employee.photo }style={{'height':'124px'}} />
								  	 :
								  	 <img src={window.APP_URL+"/common/images/profile-sample.jpg" }style={{'height':'124px'}} />
								  }
									
								  
								</div>
								<div className="emp-name">
									<b>{employee.employee_name}</b>
								</div>
								<div className="emp-email">
									{employee.email}
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-8">
						<div className="card">
							<div className="card-header">
								Employee Info
							</div>
							<div className="card-body">
								<Table striped bordered hover>
									<tbody>
								 	<tr>
          								<th>Employee Name</th>
          								<td>{employee.employee_name}</td>
          							</tr>
          							<tr>
          								<th>Gender</th>
          								<td>{employee.gender}</td>
          							</tr>
          							<tr>
          								<th>Date Of Birth</th>
          								<td>{employee.date_of_birth}</td>
          							</tr>
          							
          							<tr>
          								<th>Marital Status</th>
          								<td>{employee.marital_status}</td>
          							</tr>
          							<tr>
          								<th>Education</th>
          								<td>{employee.education}</td>
          							</tr>
          							<tr>
          								<th>Job Title</th>
          								<td>{employee.job_title}</td>
          							</tr>
          							<tr>
          								<th>Height</th>
          								<td>{employee.height}</td>
          							</tr>
          							<tr>
          								<th>ID Number</th>
          								<td>{employee.id_number}</td>
          							</tr>
          							<tr>
          								<th>Contact Number</th>
          								<td>{employee.contact_number}</td>
          							</tr>
          							<tr>
          								<th>Street Address</th>
          								<td>{employee.street_address}</td>
          							</tr>
          							<tr>
          								<th>City</th>
          								<td>{employee.city}</td>
          							</tr>
          							<tr>
          								<th>State</th>
          								<td>{employee.state}</td>
          							</tr>
          							<tr>
          								<th>Country</th>
          								<td>{employee.country}</td>
          							</tr>
          							<tr>
          								<th>Pincode</th>
          								<td>{employee.pincode}</td>
          							</tr>
          							</tbody>
          						</Table>								
							</div>
						</div>
					</div>
				</div>
			</div>
		)
}

export default EmployeeView;