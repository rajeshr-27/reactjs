import React, {useState, useEffect} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom'


function ClassFrm(){

	const [frmData,setFrmData] = useState({
		class_name:''
	})
	const {id} = useParams();
	const navigate = useNavigate();
	useEffect( () => {

		if(id){
			const fetchData  = async () => {
				await axios.get(window.API_URL+'/class/'+id).then((response)=> {
					setFrmData({
						class_name:response.data.class_details.class_name
					});
				}).catch((error) => {
					console.log(error.response.data.message);
				})
			}

			fetchData();
		}

	},[])

	const handleChange = (e) => {
		const {name,value} = e.target;
		setFrmData({
			class_name:value
		})

	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(id){

			await axios.put(window.API_URL+'/class/'+id,frmData).then((response) => {
				alert(response.data.message);
					navigate('/class-list', {replace:true})
			}).catch((error) => {
				alert(error.response.data.message);
			})

		}else {
			await axios.post(window.API_URL+'/class',frmData).then((response) => {
				alert(response.data.message);
				navigate('/class-list', {replace:true})
			}).catch((error) => {
				alert(error.response.data.message);
			})
		}
		
	}

	return(
		<div className="row mt-3">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">			
				<div className="card">
					<div className="card-header">Class</div>
					<div className="card-body">
						<Form onSubmit={handleSubmit}>
					      <Form.Group className="mb-3">
					        	<Form.Label>Class Name</Form.Label>
					        	<Form.Control type="text" onChange={handleChange} value={frmData.class_name} name="class_name" placeholder="Enter class name" />				       
					      </Form.Group> 
					      <Button variant="primary" className="float-end" type="submit">
					        Submit
					      </Button>
					    </Form> 
					</div>
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
		)
}

export default ClassFrm;