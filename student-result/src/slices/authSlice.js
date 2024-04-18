import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import setMessage from './message';

import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk(
	'auth/login',
	async ({email,password}, {rejectWithValue}) => {
		try{
			const data = await AuthService.login(email,password);
			return {user:data};

		} catch(error){ 
			const message =error.response.data.message
			 
			return rejectWithValue(message);
		}
	}
	);
const initialState = user 
	? {isLoggedIn:true, user, error:""} 
	: {isLoggedIn:false, user:null,error:""};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers:{
		logout:(state) => {
			state.isLoggedIn = false;
			state.user = null;
			localStorage.removeItem('user')
		},
		clearError:(state)=> {
			state.error = ""
		}
	},
	extraReducers:(builder)=> {
		builder.addCase(login.fulfilled, (state, action)=>{
			state.isLoggedIn = true;
			state.user= action.payload.user
		})
		builder.addCase(login.rejected, (state,action)=> {
			state.isLoggedIn = false;
			state.user = null;
			state.error = action.payload;
		})
		 
	}
	
})

const {reducer, actions} = authSlice

export const {logout, clearError} = actions

export default reducer;