import React,{useState,useEffect} from 'react';
import RestaurantCard from './RestaurantCard';
import {useDispatch, useSelector} from "react-redux";
import DishesMenu from './DishesMenu'
import {fetchRestaurants, selectRestaurant,clearError,clearMessage} from '../redux/features/restaurant/restaurantSlice';
import '../restaurant.css'



const RestaurantList = () => {
	
	const [ratingFilter, setRatingFilter] = useState("");
	const [searchTermFilter, setSearchTermFilter] = useState("");

	const {restaurants,message,error} = useSelector((state) => state.restaurant);

	const [filteredRestaurants,setFilteredResaturants] = useState([]);
	 

	const dispatch = useDispatch();	

	
	useEffect(()=>{
		 if(restaurants.length == 0){
			dispatch(fetchRestaurants());
		}
		

		filterRestaurant();
	},[dispatch,restaurants,ratingFilter, searchTermFilter])

	const handleRatingFilter = (e) => {
		setRatingFilter(e.target.value);
	}

	const handleSearchTermFilter = (e) => {
		setSearchTermFilter(e.target.value);
	}

	const handleRestaurant = (restaurantID) => {
		 
		dispatch(selectRestaurant(restaurantID));
	}

	const filterRestaurant = () => {
		let filtered = restaurants;
		if(ratingFilter){
			filtered = filtered.filter(
				(restaurant) => parseFloat(restaurant.rating) >= parseFloat(ratingFilter)
			)
		}
		if(searchTermFilter){
			const searchTermLower = searchTermFilter.toLowerCase();
			filtered = filtered.filter(
				(restaurant) => restaurant.name.toLowerCase().includes(searchTermLower)
			)
		}
		setFilteredResaturants(filtered);
	}

	if(message){
		alert(message);
		dispatch(clearMessage());
	}
	if(error){
		alert(error);
		dispatch(clearError());
	}
	return (
			<div className="restaurant">
				<div className=" container">
					<h2 className="header">Restaurant List</h2>
					<div className="filter-container">	
						<label className="filter-label">Filter by Rating</label>
						<input type="number" className="filter-input" value={ratingFilter} onChange={handleRatingFilter} />
						<label className="filter-label">Search by Name</label>
						<input type="text" className="filter-input" onChange={handleSearchTermFilter} value={searchTermFilter} />
					</div>
					<div className="restaurant-card-container">
						{ 	(Array.isArray(filteredRestaurants) && 
								filteredRestaurants.map(
									(restaurant) => (
										<RestaurantCard key={restaurant._id} restaurant={restaurant} onClick={() => handleRestaurant(restaurant._id)} />
									)
								)
							)					 
						}
					</div>
					<DishesMenu />
				</div>
			</div>
		)
}
export default RestaurantList;