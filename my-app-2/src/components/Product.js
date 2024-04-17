import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams,  useNavigate} from 'react-router-dom';

function Product() {

	const [formData,setFormData] = useState({
		product_name: '',
		price:'',
		qty:'',
		image:null
	})

	const {id} = useParams();

	const navigate = useNavigate();

	useEffect(() => {

		if(id){
			const fetchData = async () => {
			 	try {

			 		const response = await axios.get('http://localhost:5000/products/'+id);

			 		if(response.data.status == 1){
						setFormData({
							...formData,
							product_name : response.data.product.product_name,
							price : response.data.product.price,
							qty : response.data.product.qty
						});
					}

			 	}catch(error){
			 		console.log(error);
			 	}
			}

			fetchData();
		}
	}, [])

	const handleInputChange = (event) => {
		const {name,value,files} = event.target;

		setFormData({
			...formData,
			[name]:(files) ? files[0]:value
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault(); 

		try{
			let postData = new FormData();
			postData.append('image',formData.image);
			delete formData['image'];
			postData.append('data', JSON.stringify(formData));

			if(id){
				const response = await axios.put('http://localhost:5000/products/'+id, postData);

				if(response.data.status == 1){
					alert(response.data.message);
					navigate('/products',{replace:true})
				}
			}else {
				const response = await axios.post('http://localhost:5000/products', postData);

				if(response.data.status == 1){
					alert(response.data.message);
					navigate('/products',{replace:true})
					
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
						<div className="card-header">Product Form</div>
						<div className="card-body">
							<form onSubmit={handleSubmit} encType="multipart/form-data">
								<div className="mb-3 mt-3">
								    <label htmlFor="name" className="form-label">Product Name:</label>
								    <input type="text" className="form-control" id="product_name" value={formData.product_name} onChange={handleInputChange} placeholder="Enter Product Name" name="product_name" required />
								</div>
								<div className="mb-3">
								    <label htmlFor="price" className="form-label">Price:</label>
								    <input type="text" className="form-control" id="Price" value={formData.price} onChange={handleInputChange}  placeholder="Enter Price" name="price" required />
								</div>
								<div className="mb-3">
								    <label htmlFor="Qty" className="form-label">Qty:</label>
								    <input type="text" className="form-control" id="Qty" value={formData.qty} onChange={handleInputChange}  placeholder="Enter Qty" name="qty" required />
								</div>
								<div className="mb-3">
								    <label htmlFor="Image" className="form-label">Image:</label>
								    <input type="file" className="form-control" id="Image"  name="image"  onChange={handleInputChange} required  />
								</div> 
								<button type="submit" className="btn btn-primary float-end">Submit</button> 
							</form>
						</div>
					</div>
				</div>
				<div className="col-sm-4"></div>
			</div>
		</div>
		);
}

export default Product;