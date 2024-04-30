import {configureStore} from "@reduxjs/toolkit";
import restaurantRedux from '../features/restaurant/restaurantSlice';

const store = configureStore({

	reducer:{
		restaurant:restaurantRedux
	}
})


export default store;