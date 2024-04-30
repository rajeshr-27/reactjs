import {configureStore} from '@reduxjs/toolkit';
import chatReducer from '../features/chatSlice';

const store = configureStore({
	name:"chat",
	reducer: {
		chatmessage : chatReducer
	}
})

export default store