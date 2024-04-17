import React, {useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import {Link} from 'react-router-dom'

function MarkList () {
	const [markList, setMarkList] = useState([]);

	useEffect(() => {
			const fetchData = async () => {
				await axios.get(window.API_URL+'/marks').then((response) => {
					setMarkList(response.data.marks);
				}).catch((error) => {
					console.log(error.response.data.message);
				})
			}

			fetchData();
	},[])

	const handleDelete = async (id) => {

		if(window.confirm('Are you sure you want to delete!')) {
			try{

				await axios.delete(window.API_URL+'/marks/'+id).then((response) => {
					alert(response.data.message);
					setMarkList(response.data.marks);

				})
			}catch(error){
				console.log(error);
			}
		}
	}
	return (
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
							          	<th>Student Name</th>
							           	<th>Class</th>
							           	<th>Subject</th>
							           	<th>Mark</th>
							           	<th>Maximum Mark</th>
							          	<th>Action</th> 
							        </tr>
							      </thead>
							      <tbody>
							      {

							       (Array.isArray(markList) && markList.length >0) ?
							       		markList.map( (item,index) => (
							       			 
							       			<tr>
									          <td>{index  + 1}</td>
									          <td>{item.student[0].first_name + ' ' + item.student[0].last_name}</td>
									          <td>{item.class[0].class_name}</td>
									          <td>{item.subject[0].subject_name}</td>
									          <td>{item.mark}</td>
									          <td>{item.total_mark}</td>
									          <td><Link to={window.APP_URL+"/mark-frm/"+item._id} className="btn btn-sm btn-info">Edit</Link> | 
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

export default MarkList