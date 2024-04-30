import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {deleteRestaurant} from "../redux/features/restaurant/restaurantSlice";

const APP_URL = process.env.REACT_APP_URL;
const API_URL = process.env.REACT_APP_API_URL;
const API_IMG_URL = process.env.REACT_APP_API_IMG_URL;


const RestaurantCard = ({restaurant,onClick}) => {

	const dispatch = useDispatch();

	//const {message,error} = useSelector((state) => state.restaurant);

	const handleDelete = (id) => {

		if(window.confirm('Are you sure you want to delete?')){
			dispatch(deleteRestaurant(id))
		}

	}

	return(
			<div className="card" >
				<h3>{restaurant.name} 
				<span ><Link className="btn btn-sm btn-primary" to={APP_URL+"/restaurant-frm/"+restaurant._id}>Edit</Link></span>
				<span><Link onClick={() => handleDelete(restaurant._id)} className="btn btn-sm btn-danger">Delete</Link></span>
				</h3>
				<div className="image-container" onClick={onClick}> 
					<img src={API_IMG_URL+"/"+restaurant.image} alt={restaurant.name} className="restaurant-image" />
				</div>
				<p>Rating:{restaurant.rating}</p>
			</div>
		)
}

export default RestaurantCard;
