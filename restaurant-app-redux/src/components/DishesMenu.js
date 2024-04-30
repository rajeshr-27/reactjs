import React from 'react';
import DishCard from './DishCard';
import {useSelector} from 'react-redux';

const DishesMenu = () => {

	const {selectedRestaurant} = useSelector(
		(state) => state.restaurant
	)

	return(

		<div className="container">
			<h2>Menu</h2>
			{ selectedRestaurant && (
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{selectedRestaurant.map(
						(dish) => (
							<DishCard key={dish.name} dish={dish} />
							)
						)					
					}
				</div>
				)
			}
		</div>
	)
}

export default DishesMenu;