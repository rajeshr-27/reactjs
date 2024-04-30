import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const initialState = {

	isLoading:false,
	restaurants:[],
	selectedRestaurant: [],
	cartItems: [],
	totalPrice: 0,
	message:"",
	error:""
}

export const fetchRestaurants = createAsyncThunk('restaurant/list',async () => {
	return  await axios
	.get(API_URL+"/restaurant/list")
	.then((response) =>{
		localStorage.setItem('restaurants',JSON.stringify(response.data.restaurants));
			return response.data.restaurants;
	})
	 
})

export const addRestaurants = createAsyncThunk('restaurant/add', async (postData, {rejectWithValue}) => {

    try{

    	return await axios
    		.post(API_URL+"/restaurant/add",postData)
    		.then(response => response.data)

    }catch(error){
    	return rejectWithValue(error.response.data.message)
    }
})

//update Restaurant
export const updateRestaurant = createAsyncThunk('restaurant/update', async({id,postData}, {rejectWithValue})=> {

	try{ 

		return await axios
		.post(API_URL+"/restaurant/update/"+id,postData)
		.then(response => response.data);

	}catch(error){
		return rejectWithValue(error.response.data.message);
	}
})

export const deleteRestaurant = createAsyncThunk('restaurant/delete', async(id, {rejectWithValue}) => {
	try {

		return await axios.delete(API_URL+"/restaurant/delete/"+id)
		.then((response) => response.data);
	}catch(error){
		return rejectWithValue(error.response.data.message);
	}
})
const restaurantSlice = createSlice({

	name:"restaurant",
	initialState,
	reducers:{
		selectRestaurant: (state, action) => {
			const singleRestaurant = state.restaurants.find(
				(restaurant) => restaurant._id === action.payload
				);
			state.selectedRestaurant = singleRestaurant.menu;
		},
		addItem:(state,action) => {
			const existingItemIndex = state.cartItems.findIndex(
				(item) => item._id === action.payload._id
			)

			if(existingItemIndex !== -1){

				const updatedCartItems = [...state.cartItems];

				updatedCartItems[existingItemIndex] = {
					...updatedCartItems[existingItemIndex],
					quantity:updatedCartItems[existingItemIndex].quantity +1
				}
				state.cartItems = updatedCartItems;
				 
			}else {
				state.cartItems = [...state.cartItems, action.payload];
			}

			state.totalPrice += action.payload.price; 

			// localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
			// localStorage.setItem('totalPrice',state.totalPrice);
		},
		removeItem:(state,action) => {
			const existingItemIndex = state.cartItems.findIndex(
				(item) => item._id === action.payload._id
			)

			if(existingItemIndex !== -1){
				const updatedCartItems = [...state.cartItems];
				if(updatedCartItems[existingItemIndex].quantity > 1 ){
					updatedCartItems[existingItemIndex] = {
						...updatedCartItems[existingItemIndex],
						quantity:updatedCartItems[existingItemIndex].quantity -1

					}
				}else {
					updatedCartItems.splice(existingItemIndex,1);
				}
				state.cartItems = updatedCartItems;
				state.totalPrice -= action.payload.price

				// localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
				// localStorage.setItem('totalPrice',state.totalPrice);				
			}
		},
		clearMessage:(state) => {
			state.message="";
		},
		clearError:(state)=> {
			state.error = "";
		}
	},
	extraReducers:(builder) => {
		builder.addCase(fetchRestaurants.pending, (state)=> {
			state.isLoading = true;
		})
		builder.addCase(fetchRestaurants.fulfilled, (state,action)=> {
			state.isLoading = false;
			state.restaurants = action.payload
		})
		builder.addCase(fetchRestaurants.rejected, (state,action)=> {
			state.isLoading = false;
			state.restaurants =[];
			state.error = action.payload;
		})
		builder.addCase(addRestaurants.pending, (state)=> {
			state.isLoading = true;
		})
		builder.addCase(addRestaurants.fulfilled, (state,action) => {
			state.isLoading = false;
			state.message = action.payload.message;
			state.restaurants= action.payload.restaurants;
		})
		builder.addCase(addRestaurants.rejected, (state,action) => {
			state.isLoading = false;
			state.message ="";
			state.error = action.payload;
		})

		builder.addCase(updateRestaurant.pending, (state)=> {
			state.isLoading = true;
		})
		builder.addCase(updateRestaurant.fulfilled, (state,action) => {
			state.isLoading = false;
			state.message = action.payload.message;
			state.restaurants= action.payload.restaurants;
		})
		builder.addCase(updateRestaurant.rejected, (state,action) => {
			state.isLoading = false;
			state.message ="";
			state.error = action.payload;
		})

		builder.addCase(deleteRestaurant.pending, (state)=> {
			state.isLoading = true;
		})
		builder.addCase(deleteRestaurant.fulfilled, (state,action) => {
			state.isLoading = false;
			state.message = action.payload.message;
			state.restaurants= action.payload.restaurants;
		})
		builder.addCase(deleteRestaurant.rejected, (state,action) => {
			state.isLoading = false;
			state.message ="";
			state.error = action.payload;
		})
	}
})

const {reducer,actions} = restaurantSlice;

export default reducer;

export const {selectRestaurant, addItem,removeItem, clearMessage, clearError} = actions;
