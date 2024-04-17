import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import setMessage from './message';

import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk(
	'auth/login',
	async ({email,password}, thunkAPI) => {
		try{
			const data = await AuthService.login(email,password);
			return {user:data};

		} catch(error){ 
			const message =error.response.data.message
			thunkAPI.dispatch(setMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
	);
const initialState = user 
	? {isLoggedIn:true, user} 
	: {isLoggedIn:false, user:null};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers:{
		logout:(state) => {
			state.isLoggedIn = false;
			state.user = null;
			localStorage.removeItem('user')
		}
	},
	extraReducers:(builder)=> {
		builder.addCase(login.fulfilled, (state, action)=>{
			state.isLoggedIn = true;
			state.user= action.payload.user
		})
		builder.addCase(login.rejected, (state)=> {
			state.isLoggedIn = false;
			state.user = null;
		})
		 
	}
	
})

const {reducer, actions} = authSlice

export const {logout} = actions

export default reducer;