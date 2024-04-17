import React, {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';

function MarkFrm() {
	const [frmData, setFrmData] = useState({
		student_id : '',
		class_id : '',
		subject_id : '',
		mark : '',
		total_mark : '',
	});

	const [classList, setClassList] = useState([]);
	const [subjectList, setSubjectList] = useState([]);
	const [studentList, setStudentList] = useState([]);
	const {id} = useParams();
	const navigate = useNavigate();

	useEffect(()=> {

		const fetchClassData = async () => {
			await axios.get(window.API_URL+'/class').then((response) => {
				setClassList(response.data.classes);
			})
		}
		fetchClassData();
		if(id){
			const fetchData = async () => {
				await axios.get(window.API_URL+'/marks/'+id).then((response) => {

					const mark_details = response.data.markdetails

					if(mark_details.class_id){
						//fetch students
						axios.get(window.API_URL+'/students/?class_id='+mark_details.class_id).then((response) => {
							setStudentList(response.data.students);
						}).catch((error) => {
							console.log(error.response.data);
						}) 

						axios.get(window.API_URL+'/subjects?class_id='+mark_details.class_id).then((response) => {
							setSubjectList(response.data.subjects);
						}).catch((error) => {
							console.log(error.response.data);
						}) 
						
					}

					setFrmData({
						student_id : mark_details.student_id,
						class_id : mark_details.class_id,
						subject_id : mark_details.subject_id,
						mark : mark_details.mark,
						total_mark : mark_details.total_mark,
					})
				}).catch((error)=> {
					console.log(error.response.data.message);
				})
			}

			fetchData();
		}

	}, [])

	const handleChange = async (event) => {
		 
		const {name,value} = event.target
		setFrmData({
			...frmData,
			[name]:value
		});

		if(name == 'class_id'){

			//fetch students
			 await axios.get(window.API_URL+'/students/?class_id='+value).then((response) => {
				setStudentList(response.data.students);
			}).catch((error) => {
				console.log(error.response.data);
			}) 


			//fetch subjects

			await axios.get(window.API_URL+'/subjects?class_id='+value).then((response) => {
				setSubjectList(response.data.subjects);
			}).catch((error) => {
				console.log(error.response.data);
			})
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		try{			 
			if(id){
				await axios.put(window.API_URL+'/marks/'+id,frmData).then((response) => {
					alert(response.data.message);
					navigate('/mark-list', {replace:true})
				}).catch((error)=> {
					alert(error.response.data.message);
				})
			}else {
				await axios.post(window.API_URL+'/marks',frmData).then((response) => {
					alert(response.data.message);
					navigate('/mark-list', {replace:true})
				}).catch((error)=> {
					alert(error.response.data.message);
				})
			}			
		}catch(error){
			console.log(error)
		}
	}
	return (
			<div className="container">
				<div className="row mt-3">
					<div className="col-sm-4"></div>
					<div className="col-sm-4">
						<div className="card">
							<div className="card-header">MarK Form</div>
							<div className="card-body">
								<Form onSubmit={handleSubmit} >
									<Form.Group className="mb-3">
							      		<Form.Label>Class</Form.Label>
								      	<Form.Select value={frmData.class_id}  name="class_id" onChange={handleChange}>								      		
									      	<option value="">--Select Class--</option>
									      	{
									      		(Array.isArray(classList) && classList.length >0) ?
									      		classList.map((item,index) => (
									      			<option key={item._id} value={item._id}>{item.class_name}</option>
									      		)) : ''
									      	} 
									    </Form.Select>
									</Form.Group>
									<Form.Group className="mb-3">
							      		<Form.Label>Students</Form.Label>
								      	<Form.Select value={frmData.student_id}   name="student_id" onChange={handleChange}>								      		
									      	<option value="">--Select Student--</option>
									      	{
									      		(Array.isArray(studentList) && studentList.length >0) ?
									      		studentList.map((item,index) => (
									      			<option key={item._id} class_id={item.class_id._id} value={item._id}>{item.first_name + ' ' + item.last_name}</option>
									      		)) : ''
									      	} 
									    </Form.Select>
									</Form.Group> 
									<Form.Group className="mb-3">
							      		<Form.Label>Subjects</Form.Label>
									    <Form.Select value={frmData.subject_id}  name="subject_id" onChange={handleChange}>
								      		
									      	<option value="">--Select Subject--</option>
									      	{
									      		(Array.isArray(subjectList) && subjectList.length >0) ?
									      		subjectList.map((item,index) => (
									      			<option key={item._id} value={item._id}>{item.subject_name}</option>
									      		)) : ''
									      	}
									    </Form.Select> 
									</Form.Group>
									<Form.Group className="mb-3">
							        	<Form.Label>Mark</Form.Label>
							        	<Form.Control type="text"  value={frmData.mark} name="mark" onChange={handleChange} placeholder="Enter Mark" />				       
							      	</Form.Group> 
							      	<Form.Group className="mb-3">
							        	<Form.Label>Total Mark</Form.Label>
							        	<Form.Control type="text"  value={frmData.total_mark} name="total_mark" onChange={handleChange} placeholder="Enter Total Mark" />				       
							      	</Form.Group> 
							      	<Button variant="primary" className="float-end mt-3" type="submit">Submit</Button>
							    </Form> 
							</div>
						</div>
					</div>
				</div>
			</div>
		)
} 

export default MarkFrm; 