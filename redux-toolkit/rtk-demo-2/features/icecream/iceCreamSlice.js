const createSlice = require('@reduxjs/toolkit').createSlice;

const cakeActions = require('../cake/cakeSlice').cakeActions;

const initialState = {
	numberOfIceCreams:20
}

const iceCreamSlice = createSlice({
	name:'icecream',
	initialState,
	reducers:{
		ordered:(state) =>{
			state.numberOfIceCreams--

		},
		restocked:(state, action) => {
			state.numberOfIceCreams += action.payload
		}
	},
	extraReducers:(builder) => {
		builder.addCase(cakeActions.ordered, (state) => {
			state.numberOfIceCreams--
		})
	}
})

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;