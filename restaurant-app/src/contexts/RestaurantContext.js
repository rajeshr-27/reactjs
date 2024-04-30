import React, {createContext,useState,useEffect} from 'react';
import axios from 'axios';

const RestaurantContext = createContext();

const API_URL = process.env.REACT_APP_API_URL;

const RestaurantProvider = ({children}) => {
	const[restaurants,setRestaurants] = useState([]);
	const[selectedRestaurant, setSelectedRestaurant] = useState(null);
	const[cartItems,setcartItems] = useState([]);
	const[totalPrice,setTotalPrice] = useState(0);
	useEffect(()=> {
		const fetchRestaurant = async () => {

			try{

				const response = await axios.get(API_URL+"/restaurant/list");

				setRestaurants(response.data.restaurants);

			}catch(error){
				console.log(error.response.data.message);
			}
		}

		fetchRestaurant();
	},[])

	//Add cart Items

	const handleAddItems = (dish) => {

		const existingItemIndex= cartItems.findIndex(
			(item) => item._id === dish._id
		);

		if(existingItemIndex !== -1){

			const updatecartItems = [...cartItems];

			updatecartItems[existingItemIndex] = {
				...updatecartItems[existingItemIndex],
				quatity:updatecartItems[existingItemIndex].quatity + 1
			}

			setcartItems(updatecartItems);
		}else {
			setcartItems([...cartItems,{...dish, quatity:1}]);
		}

		setTotalPrice((prev) => prev + dish.price);
	}

	//handle remove items

	const handleRemoveItems = (dish) => {

		const existingItemIndex = cartItems.findIndex(
			(item) => item._id === dish._id
		)

		if(existingItemIndex !== -1){

			const updatecartItems = [...cartItems];

			if(updatecartItems[existingItemIndex].quatity > 1){

				updatecartItems[existingItemIndex] = {
					...updatecartItems[existingItemIndex],
					quatity:updatecartItems[existingItemIndex].quatity -1
				}

			}else{
				updatecartItems.splice(existingItemIndex,1)
			}

			setcartItems(updatecartItems);

			setTotalPrice((prev) => prev - dish.price);
		}

		
	}

	const value ={
		restaurants,
		selectedRestaurant,
		setSelectedRestaurant,
		handleAddItems,
		handleRemoveItems,
		totalPrice
	}

	return(

			<RestaurantContext.Provider value={value} >
				{children}
			</RestaurantContext.Provider>
		)	
}

export {RestaurantContext, RestaurantProvider}