import React, {useState,useEffect} from 'react';

import {useParams} from 'react-router-dom';

import axios from 'axios';

function BlogDetails() {

	const [blog,setBlog] = useState([]);

	const {id} = useParams();

	useEffect(()=>{
		 const fetchData = async() => {

		 	try{

		 		const response = await axios.get('http://localhost:5000/blogs/'+id);

		 		if(response.data.status == 1){
		 			setBlog(response.data.blog);
		 		}

		 	}catch(error){
		 		console.log(error);
		 	}
		 }

		 fetchData();
	},[])

	return(

			<div className="container">
				<div className="card">
					<div className="card-header">Blog Details</div>
					<div className="card-body">
						<div className="row">
							<div className="col-sm-6">
								<table className="table table-bordered">
						    		<tbody>
						    			<tr>
						    				<th>Title</th>
						    				<td>{blog.title}</td>
						    			</tr>
						    			<tr>
						    				<th>Description</th>
						    				<td>{blog.description}</td>
						    			</tr>
						    		</tbody>
						    	</table>
							</div>
							<div className="col-sm-6">
								{
									(blog.image) ? <img style={{ height: '124px', width: '124px'}} src={'http://localhost:5000/uploads/'+blog.image} />  : ''
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
}

export default BlogDetails;