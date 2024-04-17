const configureStore = require('@reduxjs/toolkit').configureStore;

const cakeReducer = require('../features/cake/cakeSlice');
const iceCreamReducer = require('../features/icecream/iceCreamSlice');
const userSlice = require('../features/user/userSlice');
/*const reduxLogger = require('redux-logger');*/
/*const logger = reduxLogger.createLogger();*/

const store = configureStore({
	reducer:{
		cake:cakeReducer,
		iceCream:iceCreamReducer,
		user:userSlice
	},
	/*middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger)*/
})

module.exports = store;