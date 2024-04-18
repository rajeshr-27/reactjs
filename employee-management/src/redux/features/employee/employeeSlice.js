import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =process.env.REACT_APP_API_URL; 
const employees = JSON.parse(localStorage.getItem('employees'));

export const fetchEmployees = createAsyncThunk('employee/list', async () => {
	return  await axios
	.get(API_URL+"/employee/list")
	.then((response)=>{ 
			localStorage.setItem('employees',JSON.stringify(response.data.employees))
			return response.data.employees.map((employee)=>employee) 
		})
})
//create Employee

export const createEmployee = createAsyncThunk('employee/register', async(postData, {rejectWithValue})=>{
	try{
		return await axios
		.post(API_URL+'/employee/register',postData)
		.then(response => response.data.message)
	}catch(error){
		return rejectWithValue(error.response.data.message);
	}
})

//update Employee

export const updateEmployee = createAsyncThunk('employee/update', async({id, postData},{rejectWithValue})=> {
	try{
		const response=  await axios
		.put(API_URL+'/employee/register/'+id,postData)
		return response.data.message;
	}catch(error){		
		return rejectWithValue(error.response.data.message);
	}
	
})

//Delete Employee

export const deleteEmployee = createAsyncThunk('employee/delete',async(id)=> {
	return await axios
	.delete(API_URL+'/employee/'+id)
	.then((response) =>{
		localStorage.setItem('employees',JSON.stringify(response.data.employees))
		return response.data
	})
})
const initialState = {
	loading:false,
	employees:employees ? employees : [],
	message:"",
	error:""
}

const employeeSlice = createSlice({
	name:"employee",
	initialState,
	reducers:{
		clearError:(state)=> {
			state.error ="";
		},
		clearMessage:(state)=> {
			state.message ="";
		}
	},
	extraReducers:(builder)=> {
		builder.addCase(fetchEmployees.pending,(state)=> {
			state.loading = true
		})
		builder.addCase(fetchEmployees.fulfilled,(state, action)=> {
			state.loading = false;
			
			state.employees = action.payload
		})
		builder.addCase(fetchEmployees.rejected,(state, action)=> {
			state.loading = false;
			state.employees = [];
			state.error = action.error.message
		})

		builder.addCase(createEmployee.pending,(state)=> {
			state.loading = true
		})
		builder.addCase(createEmployee.fulfilled,(state, action)=> {
			state.loading = false; 
			state.message = action.payload;
		})
		builder.addCase(createEmployee.rejected,(state, action)=> {
			state.loading = false;
			state.message="";
			state.error = action.payload
		})
		builder.addCase(updateEmployee.pending,(state,action)=> {
			state.loading = true;

		})
		builder.addCase(updateEmployee.fulfilled, (state,action)=> {
			state.loading = false;
			state.message = action.payload
		})
		builder.addCase(updateEmployee.rejected, (state,action)=> {
			state.loading = false;
			state.message="";
			state.error = action.payload
		})

		builder.addCase(deleteEmployee.pending,(state)=>{
			state.loading = true
		})

		builder.addCase(deleteEmployee.fulfilled,(state,action)=> {
			state.loading =  false;
			state.employees = action.payload.employees
			state.message = action.payload.message
		})
		builder.addCase(deleteEmployee.rejected,(state,action)=>{
			state.loading=false;
			state.error = action.error.message;
		})
	}
});

const {reducer,actions} = employeeSlice;

export default reducer

export const {clearError, clearMessage} = actions