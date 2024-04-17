import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

function Blog() {

	const [formData, setFormData] = useState({
		title:'',
		description: '',
		image: null
	})

	const {id} = useParams();
	const navigate = useNavigate();

	useEffect(() =>{

		if(id){
			console.log('updaate');
			const fetchData = async () => {
				try{

					const response = await axios.get('http://localhost:5000/blogs/'+id);

					if(response.data.status == 1){
						setFormData({
							...formData,
							title:response.data.blog.title,
							description:response.data.blog.description,
							image:response.data.blog.image,
						})
					}

				}catch(error){
					console.log(error);
				}
			}
			fetchData();
		}

	},[])

	const handleChange = (event) => {

		const {name,value,files} = event.target;

		setFormData({
			...formData,
			[name] : (files)?files[0]:value
		});

	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try{
			let postData = new FormData();

			postData.append('image',formData.image);
			delete formData['image'];
			postData.append('data', JSON.stringify(formData));
			if(id){
				const response = await axios.put('http://localhost:5000/blog/'+id,postData);
				if(response.data.status == 1){
					alert(response.data.message);
					navigate('/blog-list', {replace:true})
				}
			}else {
				const response = await axios.post('http://localhost:5000/blog',postData);
				if(response.data.status == 1){
					alert(response.data.message);
					navigate('/blog-list', {replace:true})
				}
			}

			
		}catch(error){
			console.log(error);
		}

		



	}
	return(
			<div className="container">
				<div className="row mt-3">
					<div className="col-sm-4"></div> 
					<div className="col-sm-4">
						<div className="card">
							<div className="card-header">Blog Form</div>
							<div className="card-body">
								<form  onSubmit={handleSubmit} encType="multipart/form-data">
								  <div className="mb-3 mt-3">
								    <label htmlFor="title" className="form-label">Title:</label>
								    <input type="text" className="form-control" id="title" placeholder="Enter title" value={formData.title} onChange={handleChange} name="title" />
								  </div>
								  <div className="mb-3">
								    <label htmlFor="Description" className="form-label">Description:</label>
								    <textarea className="form-control" rows="5" id="Description" name="description" onChange={handleChange} value={formData.description} ></textarea>
								  </div> 

								  <div className="mb-3 mt-3">
								    <label htmlFor="image" className="form-label">Image:</label>
								    <input type="file" className="form-control" id="image" name="image" onChange={handleChange}  />
								  </div>
								  <button type="submit" className="btn btn-primary float-end">Submit</button>
								</form>
							</div>
						</div>
					</div>
					<div className="col-sm-4"></div>
				</div>
			</div>
		)
}

export default Blog;