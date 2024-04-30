import React from 'react';

import {addItem, removeItem} from '../redux/features/restaurant/restaurantSlice';

import {useDispatch} from 'react-redux';
const DishCard = ({dish}) => { 

	const API_IMG_URL = process.env.REACT_APP_API_IMG_URL;

	const dispatch = useDispatch();
	
	const handleAdd = () => {

		const cartItem = {
			...dish,
			quantity:1
		}
		dispatch(addItem(cartItem));
		 
	}
	const handleRemove = () => {
		dispatch(removeItem(dish));
		console.log('handle remove');
	}

	return (
			<div className="dish-card">
				<h3>{dish.name}</h3>
				<img src={API_IMG_URL+"/"+dish.image}  />
				<p>{dish.price}</p>
				<div
	                style={{
	                    width: "40%",
	                    display: "flex",
	                    justifyContent: "space-between",
	                    alignItems: "center",
	                }}
	            >
	                <button onClick={handleAdd}>+</button>
	                <button onClick={handleRemove}>-</button>
	            </div>
	        </div>

		)
}

export default DishCard