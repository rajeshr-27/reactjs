import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Link} from 'react-router-dom'
function Result() {

	const [student,setStudent] = useState('');
	const [frmData,setFrmData] = useState({
		roll_no:''
	})

	const [result, setResult] = useState([]);
	const[overAllMark,setOverAllMark] = useState({
		taken:0,
		total:0
	})

	const handleChange = (e) => {
		const {name, value} = e.target;

		setFrmData({
			...frmData,
			[name]:value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
 
		await axios.get(window.API_URL+'/students/rollno?roll_no='+frmData.roll_no).then((response) => {
			setStudent(response.data.student_details);

			const student_id = response.data.student_details._id;
			const class_id = response.data.student_details.class_id._id

			//fetch resulst
			if(student_id && class_id) {
				axios.get(window.API_URL+'/marks/?student_id='+student_id+'&class_id='+class_id).then((response) => {
					setResult(response.data.marks);

					setOverAllMark({
						taken:response.data.overall_taken_mark,
						total:response.data.overall_total_mark
					})

				}).catch((error) => {
					 console.log(error.response.data.message);
				})

			}
		}).catch((error) => {
			alert(error.response.data.message);
		})

	}

	return(

			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<div className="card">
							<div className="card-header">Mark List <Link className="btn btn-sm btn-primary float-end" to={window.APP_URL+'/mark-frm'}>Add</Link></div>
							<div className="card-body">
								<div className="row">
									<div className="col-sm-4"></div>
									<div className="col-sm-4">
										<Form onSubmit={handleSubmit} >
											 <Table striped bordered hover>
											      <thead>
											        <tr> 
											          	<th>Roll Number</th> 
											          	<th>Action</th> 
											        </tr>
											      </thead>
											      <tbody>
											      	<tr>
											      		<td>
											      			<Form.Group > 
													        	<Form.Control type="text" value={frmData.roll_no} name="roll_no" onChange={handleChange} placeholder="Enter Roll Number" />				       
													      	</Form.Group> 
													    </td>
													    <td>
													     	<Button variant="primary" className="btn btn-sm" type="submit">Submit</Button>
													    </td>
													</tr>
												</tbody>
											</Table>
										</Form>
									</div>
									<div className="col-sm-4"></div>
								</div>
								<div className="row"> 
									<div className="col-sm-8">
										 <Table striped bordered hover>
										      <thead>
										        <tr> 
										          	<th colSpan="4">Class: { (student) ? student.class_id.class_name : ''}</th>  
										        </tr>
										        <tr>
										        	<td>#</td>
										        	<td>Subject</td>
										        	<td>Mark</td>
										        	<td>Maximum Mark</td>
										        </tr>
										      </thead>
										      <tbody>
										       { 
										       	 (Array.isArray(result) && result.length > 0) ?
										       	 result.map((item,index) => (  
										       	 	<tr>
											      		<td>{index+1}</td>
											      		<td>{item.subject[0].subject_name}</td>
											      		<td>{item.mark}</td>
											      		<td>{item.total_mark}</td>
													</tr>
										       	 	))
										       	 

										       	 : ''
										       }

										        { 
										       	 (Array.isArray(result) && result.length > 0) ?
										       	  
										       	 	<tr>
											      		<td colSpan="2">Total</td>
											      		<td>{overAllMark.taken}</td>
											      		<td>{overAllMark.total}</td>
													</tr> 
										       	 : ''
										       }
										      	
											</tbody>
										</Table>
									</div> 
									<div className="col-sm-4">
									{

										(student.photo) ?
										<img src={ window.API_IMG_URL	 +'/'+student.photo} style={{ height: '124px', width: '124px'}} />
										: ''
									}
										
										<div>{(student) ? student.first_name + ' ' + student.last_name : ''}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
}

export default Result;