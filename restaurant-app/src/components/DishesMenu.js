import React,{useContext} from 'react';
import {RestaurantContext} from '../contexts/RestaurantContext';
import DishCard from './DishCard';

const DishesMenu = () => {

	const {selectedRestaurant} = useContext(RestaurantContext);

	 
	return (
		 	<div className="container">
		 		<h2>Menu</h2>
		 		{ selectedRestaurant && (
		 			<div style={{display:'flex',flewxwrap:'wrap'}}>
		 		 		{selectedRestaurant.menu.map(
		 		 			(dish) => (
		 		 				<DishCard key={dish.name} dish={dish} />
		 		 			))
		 		 		}
		 		 	</div>		 			
		 		)} 
		 	</div>
		)
}

export default DishesMenu;