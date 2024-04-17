const redux = require('redux')
const thunkMiddleware = require('redux-thunk').thunk
const axios = require('axios')
const createStore = redux.createStore;

const applyMiddleware = redux.applyMiddleware;

const initialState = {
	loading: false,
	users: [],
	error:''
}

//Action

const FETCH_USERS_REQUESTED 	= 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED 	= 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED 	= 'FETCH_USERS_FAILED';

function fetchUsersRequest() {

	return {

		type:FETCH_USERS_REQUESTED
	}
}

function fetchUsersSuccess(user) {

	return {

		type:FETCH_USERS_SUCCEEDED,
		payload:user
	}
}

function fetchUsersFail(error) {

	return {

		type:FETCH_USERS_FAILED,
		payload:error
	}
}

//reducer

const reducer = (state = initialState,action) =>{
	switch(action.type){
		case FETCH_USERS_REQUESTED :
			return {
				...state,
				loading:true
			}
		case FETCH_USERS_SUCCEEDED:
			return {
				loading:false,
				users:action.payload,
				error:''
			}
		case FETCH_USERS_FAILED:
			return { 
				loading:false,
				users:[],
				error:action.payload,

			}
		default :
			return state
	}
}

const fetchUsers = () => {

	return function (dispatch){

		dispatch(fetchUsersRequest());

		  axios.get('https://jsonplaceholder.typicode.com/users').then( (response) => {
		  	 
			const users = response.data.map((user) => user.id);
			dispatch(fetchUsersSuccess(users));

		}).catch((error) => {
			dispatch(fetchUsersFail(error.message));
		})
	}
}

const store = createStore(reducer,applyMiddleware(thunkMiddleware));

store.subscribe(() => {
	console.log(store.getState());
})

store.dispatch(fetchUsers());