import React, {useState, useEffect} from 'react';
import {Link} from  'react-router-dom';
import axios from 'axios';

function BlogList() {
	const [blogs, setBlogs] = useState([]);

	useEffect(()=> {

		const fetchData = async () => {

			try{
				 const response= await axios.get('http://localhost:5000/blogs');

				 if(response.data.status == 1){
				 	setBlogs(response.data.blogs);
				 }
			}catch(error) {
				console.log(error);
			}
		}

		fetchData()
	},[])

	const handleDelete = async (id) => {

		if(window.confirm('Are you sure you want to delete?')) {
			try {

				const response = await axios.delete('http://localhost:5000/blogs/'+id);

				if(response.data.status == 1){
					alert(response.data.message);
					setBlogs(response.data.blogs);
				}

			}catch(error){
				console.log(error);
			}
		}
	}
	return(
			<div className="container"> 
				<div className="card">
					<div className="card-header">Blog List <span className="float-end"><Link className="btn btn-sm btn-success" to={window.BASE_URL+'/blog'} >Add</Link></span></div>
					<div className="card-body">
						 <table className="table table-bordered">
						    <thead>
						      <tr>
						      	<th>S.No</th>
						        <th>Title</th>
						        <th>Description</th>
						        <th>Action</th>
						      </tr>
						    </thead>
						    <tbody>
						     {
						     	(Array.isArray(blogs) && blogs.length >0) ? 

						     		blogs.map( (item,index) => (
						     				<tr key={item._id}>
						     					<td>{index+1}</td>
										        <td>{item.title}</td>
										        <td>{item.description}</td>
										        <td>
										        	<Link to={window.BASE_URL+'/blog/'+item._id} className="btn btn-sm btn-primary">Edit</Link> | 
										        	<Link onClick={ () => handleDelete(item._id)} className="btn btn-sm btn-danger">Delete</Link> | 
										        	<Link  to={window.BASE_URL+'/blog-details/'+item._id} className="btn btn-sm btn-info">View</Link>
										        </td>
										    </tr> 

						     			))
						     		:
						     		<tr colSpan="3">No Record found</tr>
						     }
						     
						    </tbody>
						  </table>
					</div>
				</div>
			</div>
		)
}

export default BlogList;