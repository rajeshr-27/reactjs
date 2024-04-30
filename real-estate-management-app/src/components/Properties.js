import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from  "react-redux";
import { getProperties,deleteProperty,clearMessage } from '../redux/features/propertySlice';
function Properties() {
    const navigate = useNavigate();
     const {properties,message} = useSelector((state)=>state.property);
     const dispatch = useDispatch();
     useEffect(()=>{
        dispatch(getProperties());
     },[])

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            dispatch(deleteProperty(id))
        }
    }

    if(message){
        alert(message);
        dispatch(clearMessage())
        navigate('/properties',{replace:true})
      }
     
  return (
    <div className='container'>
        <div className='card'>
            <div className='card-header'>
                <h4>Property List <Link to="/property-frm" className='btn btn-sm btn-success float-end'>Add</Link></h4>
            </div>
        </div>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            { (properties && properties.map((property, i) => (
                  <tr key={property._id}>
                  <td>{i+1}</td>
                  <td>{property.title}</td>
                  <td>{property.desc}</td>
                  <td>
                      <Link to={"/property-frm/"+property._id} className='btn btn-sm btn-info'>Edit</Link> | 
                      <Link  onClick={() => handleDelete(property._id)}  className='btn btn-sm btn-danger'>Delete</Link>
      
      
                  </td>
                  </tr>

            )))}
          
    
        </tbody> 
        </Table>
    </div>
  );
}

export default Properties;