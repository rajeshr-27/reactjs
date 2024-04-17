const redux = require('redux');
const produce = require('immer').produce;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
const initialState = {
	name:'Rajesh',
	address: {
		street: '52 Amman Kovil street',
		city:'Erode',
		state:'Tamilnadu'
	}
}

//Action
const STREET_UPDATE = 'STREET_UPDATE';

function updateStreet(street){

	return{
		type:STREET_UPDATE,
		payload:street
	}
}

//Reducer

const reducer  =(state = initialState, action) => {
	switch(action.type){
		case STREET_UPDATE : 
			/*return {
				...state,
				address:{
					...state.address,
					street:action.payload
				}
			}*/

			return produce(state, (draft)=>{
				draft.address.street = action.payload
			})

		default:
			return state
	}
}

const store = createStore(reducer, applyMiddleware(logger));

console.log('Initial State:', store.getState());

const unsubscribe = store.subscribe( () => {})


store.dispatch(updateStreet('34 Amman Kovil Street'));

unsubscribe();