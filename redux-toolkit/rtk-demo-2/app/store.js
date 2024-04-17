const configureStore = require('@reduxjs/toolkit').configureStore;

const cakeReducer = require('../features/cake/cakeSlice');

const iceCreamReducer = require('../features/icecream/iceCreamSlice');

const userReducer = require('../features/user/userSlice');

const store = configureStore({
	reducer:{
		cake:cakeReducer,
		icecream:iceCreamReducer,
		users:userReducer
	}
})

module.exports = store;