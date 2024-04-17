import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';

function SubjectFrm() {
	const [frmData,setFrmData] = useState({
		subject_name: '',
		class_id: ''
	})

	const [classList,setClassList] = useState([]);

	const {id} = useParams();
	const navigate = useNavigate();
	
	useEffect(()=> {
			const fetchClassData = async () => {
				await axios.get(window.API_URL+'/class').then((response) => {
					setClassList(response.data.classes);
				}).catch((error)=> {
					console.log(error.response.data);
				})
			}
		fetchClassData();

		if(id){
			const fetchData = async () => {
				await axios.get(window.API_URL+'/subjects/'+id).then((response) => {
					setFrmData({
						subject_name: response.data.subject_details.subject_name,
						class_id : response.data.subject_details.class_id
					})

				}).catch((error) => {
					console.log(error.response.data);
				});
			}
			fetchData();
		}
	},[])

	const handleChange = (event) => {
		const {name,value} = event.target;
		setFrmData({
			...frmData,
			[name]:value
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		//post data store
		if(id){
			await axios.put(window.API_URL+'/subjects/'+id,frmData).then((response) => {
				alert(response.data.message);
				navigate('/subject-list', {replace:true});
			}).catch((error) => {
				alert(error.response.data.message);
			})
		}else {
			await axios.post(window.API_URL+'/subjects',frmData).then((response) => {
				alert(response.data.message);
				navigate('/subject-list', {replace:true});
			}).catch((error) => {
				alert(error.response.data.message);
			})
		}
		
	}
	return(
			<div className="container">
				<div className="row mt-3">
					<div className="col-sm-4"></div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-header">Subject Form</div>
							<div className="card-body">
								<Form onSubmit={handleSubmit}>
							      	<Form.Group className="mb-3">
							        	<Form.Label>Subject Name</Form.Label>
							        	<Form.Control type="text"  value={frmData.subject_name} name="subject_name" onChange={handleChange} placeholder="Enter subject name" />				       
							      	</Form.Group> 
							      	<Form.Select value={frmData.class_id}  name="class_id" onChange={handleChange}>
							      	<Form.Label>Class</Form.Label>
								      	<option value="">--Select Class--</option>
								      	{
								      		(Array.isArray(classList) && classList.length >0) ?

								      		classList.map((item,index) => (
								      			<option value={item._id}>{item.class_name}</option>

								      		)) : ''
								      	} 
								    </Form.Select>
							      	<Button variant="primary" className="float-end mt-3" type="submit">
							        Submit
							      	</Button>
							    </Form> 
							</div>
						</div>
					</div>
				</div>
			</div>
		)
}

export default SubjectFrm;
