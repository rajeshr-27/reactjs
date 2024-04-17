import React,{useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import {Link} from 'react-router-dom'

function ClassList() {

	const [classList,setClass] = useState([]);

	useEffect(()=>{

		const fetchData = async () => {
			const url = window.API_URL+'/class';
			await axios.get(url).then( (response) => {
				 
				setClass(response.data.classes);
			}).catch((error)=> {
				console.log(error.response.data);
			})
		}

		fetchData();

		console.log(classList);

	},[])

	const handleDelete = async (id) => {

		if(window.confirm('Are you sure you want to delete!')){

			try{
				const url = window.API_URL+'/class/'+id
				await axios.delete(url).then((response) => {

					alert(response.data.message);
					setClass(response.data.class);
				})

			}catch(error){
				console.log(error)
			}
		}
	}

	return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<div className="card">
							<div className="card-header">Class List <Link className="btn btn-sm btn-primary float-end" to={window.APP_URL+'/class-frm'}>Add</Link></div>
							<div className="card-body">
								 <Table striped bordered hover>
								      <thead>
								        <tr>
								          <th>#</th>
								          <th>Class Name</th>
								          <th>Action</th> 
								        </tr>
								      </thead>
								      <tbody>
								      {

								       (Array.isArray(classList) && classList.length >0) ?
								       		classList.map( (item,index) => (
								       			 
								       			<tr>
										          <td>{index  + 1}</td>
										          <td>{item.class_name}</td>
										          <td><Link to={window.APP_URL+"/class-frm/"+item._id} className="btn btn-sm btn-info">Edit</Link> | 
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

export default ClassList;

