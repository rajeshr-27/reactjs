import {configureStore} from "@reduxjs/toolkit";
import employeeReducer from '../features/employee/employeeSlice';

const store = configureStore({

	reducer:{
		employee:employeeReducer,
		devTools:true
	}
})

export default store;