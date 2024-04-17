const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

//Action

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';

const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

function orderCake(qty =1){

	return {
		type:CAKE_ORDERED,
		quantity:qty
	}
}

function restockCake(qty=1){
	return {
		type:CAKE_RESTOCKED,
		payload:qty
	}
}


function orderIceCream(qty =1){

	return {
		type:ICECREAM_ORDERED,
		quantity:qty
	}
}

function restockIceCream(qty=1){
	return {
		type:ICECREAM_RESTOCKED,
		payload:qty
	}
}
const initialCakeState = {
	numberOfCakes : 10
}

const initialIceCreamState = {
	numberOfIceCrams : 20
}

//reduce

const reducerCake = (state = initialCakeState,action) => {

	switch(action.type) {
		case CAKE_ORDERED:
			return {
				...state,
				numberOfCakes : state.numberOfCakes -1
			}
		case CAKE_RESTOCKED :
			return{
				...state,
				numberOfCakes : state.numberOfCakes + action.payload
			}
		default :
			return state
	}
}

const reducerIceCream = (state = initialIceCreamState,action) => {

	switch(action.type) {
		case ICECREAM_ORDERED:
			return {
				...state,
				numberOfIceCrams : state.numberOfIceCrams -1
			}
		case ICECREAM_RESTOCKED :
			return{
				...state,
				numberOfIceCrams : state.numberOfIceCrams + action.payload
			}

		case CAKE_ORDERED :
			return{
				...state,
				numberOfIceCrams : state.numberOfIceCrams -1
			}
		default :
			return state
	}
}

const rootReducer= combineReducers({
	cake:reducerCake,
	iceCream:reducerIceCream
})
/*const store = createStore(rootReducer,applyMiddleware(logger));*/

const store = createStore(rootReducer); 

console.log('Initial state:',store.getState());

const unsubscribe = store.subscribe( () => {
	console.log('Update state:',store.getState());
})


store.dispatch(orderCake());

store.dispatch(orderCake());

store.dispatch(orderCake());

store.dispatch(restockCake(3));

store.dispatch(orderIceCream());

store.dispatch(orderIceCream());

store.dispatch(orderIceCream());

store.dispatch(restockIceCream(3));

unsubscribe();