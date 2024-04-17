import React, {useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import {Link} from 'react-router-dom'

function StudentList() {

	const [studentList, setStudentList] = useState([]);

	useEffect(()=> {

		const fetchData = async () => {

			await axios.get(window.API_URL+'/students').then((response) => {

				setStudentList(response.data.students);
			}).catch((error)=> {
				console.log(error.response.data.message);
			})
		}
		fetchData();
	},[]);

	const handleDelete = async (id) => {

		if(window.confirm('Are you sure you want to delete!')){
			try{
				await axios.delete(window.API_URL+'/students/'+id).then((response) => {
					alert(response.data.message);
					setStudentList(response.data.students);
				}).catch((error)=> {
					alert(error.response.data.message);
				})
			}catch(error){
				console.log(error);
			}
		}
	}

	return(
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<div className="card">
							<div className="card-header">Class List <Link className="btn btn-sm btn-primary float-end" to={window.APP_URL+'/student-frm'}>Add</Link></div>
							<div className="card-body">
								 <Table striped bordered hover>
								      <thead>
								        <tr>
								          	<th>#</th>
								          	<th>Student Name</th>
								           	<th>Email</th>
								           	<th>Dob</th>
								           	<th>Class</th>
								          	<th>Action</th> 
								        </tr>
								      </thead>
								      <tbody>
								      {

								       (Array.isArray(studentList) && studentList.length >0) ?
								       		studentList.map( (item,index) => (
								       			 
								       			<tr>
										          <td>{index  + 1}</td>
										          <td>{item.first_name + ' ' + item.last_name}</td>
										          <td>{item.email}</td>
										          <td>{item.dob}</td>
										          <td>{item.class_id.class_name}</td>
										          <td><Link to={window.APP_URL+"/student-frm/"+item._id} className="btn btn-sm btn-info">Edit</Link> | 
										          <Link onClick={() => handleDelete(item._id)} className="btn btn-sm btn-danger">Delete</Link></td>
										        </tr>
								       			))
									       
									    : ''
								    }
								      </tbody>
							    </Table>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
}

export default StudentList