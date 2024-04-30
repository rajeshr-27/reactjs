import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export const getMessages = createAsyncThunk('chat/messages',async ()=>{
			const response = await axios.get(API_URL+"/chat/message");
			
			return response.data.chats;
		})

export const addMessage = createAsyncThunk('chat/addMessage', async({user,message}, {rejectWithValue})=>{
	try{
		const response = await axios.post(API_URL+"/chat/message",{username:user,message});
		return response.data

	}catch(error){
		return rejectWithValue(error.response.data.message);
	}
})
const initialState = {
	isLoading:false,
	chats:[],
	error:""
}

const chatSlice = createSlice({
	name:'chatmessage',
	initialState,
	extraReducers: (builder) =>{
		builder.addCase(getMessages.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getMessages.fulfilled, (state, action ) => {
			state.isLoading = false
			 
			state.chats = action.payload
		})
		builder.addCase(getMessages.rejected, (state, action ) => {
			state.isLoading = false
			state.chats = []
			state.error= "Server issue"
		})

		builder.addCase(addMessage.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(addMessage.fulfilled, (state, action ) => {
			state.isLoading = false
			 
			state.chats = action.payload.chats
		})
		builder.addCase(addMessage.rejected, (state, action ) => {
			state.isLoading = false
			state.chats = []
			state.error= action.payload
		})
		 
	}
})

const {reducer,actions} = chatSlice;

export default reducer;