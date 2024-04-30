import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react';
const API_URL = process.env.REACT_APP_API_URL;
export const getProperties =  createAsyncThunk('property/list',  async ()=>{
    const response = await axios.get(API_URL+"/property/list")
    return response.data.properties;
});

export const addProperty =  createAsyncThunk('property/register',  async (postData, {rejectWithValue})=>{
    try{
        const response = await axios.post(API_URL+"/property/register", postData)
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data.message)
    }
   
});
export const updateProperty =  createAsyncThunk('property/update',  async ({id,postData}, {rejectWithValue})=>{
    try{
        const response = await axios.put(API_URL+"/property/register/"+id, postData)
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data.message)
    }
   
});

export const deleteProperty =  createAsyncThunk('property/delete',  async (id, {rejectWithValue})=>{
    try{
        const response = await axios.delete(API_URL+"/property/"+id)
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data.message)
    }
   
});
const initialState = {
    isLoading:false,
    properties:[],
    message:"",
    error:""
}

const propertySlice = createSlice({
    name:"property",
    initialState,
    reducers:{
        clearMessage:(state,action)=>{
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProperties.pending,(state)=> {
            state.isLoading= true
        })
        builder.addCase(getProperties.fulfilled,(state,action)=> {
            state.isLoading= false
            state.properties = action.payload
        })
        builder.addCase(getProperties.rejected,(state,action)=> {
            state.isLoading= false
            state.properties = [];
            state.error = action.payload
        })

        builder.addCase(addProperty.pending,(state)=> {
            state.isLoading= true
        })
        builder.addCase(addProperty.fulfilled,(state,action)=> {
            state.isLoading= false
            state.properties = action.payload.properties
            state.message = action.payload.message
        })
        builder.addCase(addProperty.rejected,(state,action)=> {
            state.isLoading= false
            state.properties = [];
            state.error = action.payload
            state.message = ""
        })        
        builder.addCase(updateProperty.pending,(state)=> {
            state.isLoading= true
        })
        builder.addCase(updateProperty.fulfilled,(state,action)=> {
            state.isLoading= false
            state.properties = action.payload.properties
            state.message = action.payload.message
        })
        builder.addCase(updateProperty.rejected,(state,action)=> {
            state.isLoading= false
            state.properties = [];
            state.error = action.payload
            state.message = ""
        })

        builder.addCase(deleteProperty.pending,(state)=> {
            state.isLoading= true
        })
        builder.addCase(deleteProperty.fulfilled,(state,action)=> {
            state.isLoading= false
            state.properties = action.payload.properties
            state.message = action.payload.message
        })
        builder.addCase(deleteProperty.rejected,(state,action)=> {
            state.isLoading= false
            state.properties = [];
            state.error = action.payload
            state.message = ""
        })
    }
})


const {reducer, actions} = propertySlice;

export default reducer;

export const {clearMessage} = actions;
