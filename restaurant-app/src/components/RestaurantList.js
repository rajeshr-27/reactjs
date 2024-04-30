import React, {useContext,useState,useEffect} from 'react';

import {RestaurantContext} from '../contexts/RestaurantContext';
import RestaurantCard from '../components/RestaurantCard';

const RestaurantList = () => {

	const {restaurants, setSelectedRestaurant} = useContext(RestaurantContext); 
	const [filteredRestaurants, setFilteredRestaurants] = useState([...restaurants]);
	const [ratingFilter, setRatingFilter] = useState("");
	const [searchTerm,setSearchTerm] = useState("");
	

	useEffect(()=> {
		filterRestaurants();
	},[ ratingFilter, searchTerm, restaurants])


	const handleRestaurntClick = (restaurantId) => {
		setSelectedRestaurant(
			restaurants.find(
				(restaurant) => restaurant._id === restaurantId
			)
		);
		console.log('restaurant selected');
	}

	const handleRatingChange = (e) => {
		setRatingFilter(e.target.value);
	}

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	}
	const filterRestaurants = () => {

		let filtered = restaurants;
		 

		if(ratingFilter){
			filtered = filtered.filter(
				(restaurant) => parseFloat(restaurant.rating) >= parseFloat(ratingFilter)
			)
		}
		

		if(searchTerm){
			const searchLower = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(restaurant) => restaurant.name.toLowerCase().includes(searchLower)
			)
		}

		setFilteredRestaurants(filtered);
	}
 
	 

	return(
			<div className="container">
				<h2 className="header">Restaurant List</h2>
				<div className="filter-container">
					<label className="filter-label">
						Filter by rating
					</label>
					<input type="number" className="filter-input"  value={ratingFilter} onChange={handleRatingChange} />
					
					<label className="filter-label">
						Search by Name:
					</label>
					<input type="text" id="search" className="filter-input"  value={searchTerm} onChange={handleSearchChange} />
				</div> 
				<div className="restaurant-card-container">
					{Array.isArray(filteredRestaurants) && filteredRestaurants.map((restaurant) => (

						<RestaurantCard key={restaurant._id} restaurant={restaurant} onClick={() => handleRestaurntClick(restaurant._id)} />

						))
						
					}
				</div>
			</div>

		)
}

export default RestaurantList;