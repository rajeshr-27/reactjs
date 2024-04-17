import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ProductList() {

	const [products,setProducts]= useState([]);

	useEffect( () => {
		const fetchData = async() => {
			const response = await axios.get('http://localhost:5000/products');
			console.log(response.data.products);

			if(response.data.status = 1){
				setProducts(response.data.products);
			}

			
		}

		fetchData();
	}, [])

	return(

			<div className="container">
				<div className="card">
					<div className="card-header">Products <Link to="/product" className="btn btn-sm btn-primary float-end">Add</Link></div>
					<div className="card-body">
						<table className="table table-bordered">
						    <thead>
						      <tr>
						        <th>Product name</th>
						        <th>Price</th>
						        <th>Qty</th>
						        <th>Action</th>
						      </tr>
						    </thead>
						    <tbody>
						    { 
						    	(Array.isArray(products) && products.length > 0) ?

						    	products.map(item => (
						    		
						    		<tr key={item._id}>
								        <td>{item.product_name}</td>
								        <td>{item.price}</td>
								        <td>{item.qty}</td>
								        <td>
								        	<Link to={window.BASE_URL+'/product/'+item._id} className="btn btn-sm btn-primary">Edit</Link> | 
								        	<a  className="btn btn-sm btn-danger" href="">Delete</a> | 
								        	<Link to={window.BASE_URL+'/product-details/'+item._id} className="btn btn-sm btn-info">View</Link>
								        </td>
							      	</tr>

						    	))
						    	 : 

						      <tr>
						      	<td colSpan="4">Product not found</td>
						      </tr>
							}
						     
						       
						    </tbody>
						</table>
					</div>
				</div>
			</div>
		)
}

export default ProductList;
