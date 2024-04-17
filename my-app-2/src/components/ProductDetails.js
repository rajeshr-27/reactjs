import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function ProductDetails() {
	const [product,setProduct] = useState([]);

	const {id} = useParams();

	useEffect(()=>{

		const fetchData = async() => {
			try{
				const response = await axios.get('http://localhost:5000/products/'+id);

				if(response.data.status == 1){
					setProduct(response.data.product);
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
					<div className="card-header">Product Details</div>
					<div className="card-body">
						<div className="row">
							<div className="col-sm-6">
								<table className="table table-bordered">
									<tbody>
										<tr>
											<th>Product Name</th>
											<td>{product.product_name}</td>
										</tr>
										<tr>
											<th>Price</th>
											<td>{product.price}</td>
										</tr>
										<tr>
											<th>Product Name</th>
											<td>{product.qty}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="col-sm-6">
								{
									(product.image) ?
										<img style={{ height: '124px', width: '124px'}} className="img-responsive" src={`http://localhost:5000/uploads/`+product.image} />
										: ''
								}
							</div>
						</div>
					</div>
				</div>
			</div>

		)
}

export default ProductDetails;