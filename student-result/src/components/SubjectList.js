import React,{useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
function SubjectList () {
	const [subjectList, setSubjectList] = useState([]);
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10) 
	const [search, setSearch] = useState("")
	const [sort,setSort] = useState("");
	const [total,setTotal] =  useState("")
	const [totalPages, setTotalPaages] = useState(0)
	const [sno,setSno] = useState((page-1)*limit)

	const fetchData = async (page, limit, search, sort) => {
		const url = window.API_URL+'/subjects?page='+page+'&limit='+limit+'&search='+search+'&sort='+sort
		await axios.get(url).then((response) => {
			setSubjectList(response.data.subjects)
			setTotal(response.data.total);

			setTotalPaages( Math.ceil(response.data.total/response.data.limit))

			setSno((response.data.page-1) * response.data.limit)
		}).catch(error => {
			console.log(error.response.data)
		})
	}
	useEffect(() => {
		

	fetchData(page, limit, search, sort);
	},[])

	const setNewPage = async (pageno) => {
		setPage(pageno);
		fetchData(pageno, limit, search, sort);

	}

	const handleSearch = async (e) => {
		const search_value = e.target.value
		
		setSearch(search_value)
		fetchData(1, limit, search_value, sort);

	}
	const handleDelete = async (id) => {
		if(window.confirm('Are you sure you want to delete!')) {

			try {
				await axios.delete(window.API_URL+'/subjects/'+id).then((response) => {
					alert(response.data.message);
					setSubjectList(response.data.subjects);


				}).catch((error) => {
					console.log(error.response.data.message);
				})
			}catch(err){
				console.log(err);
			}
		}
	}
	return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<div className="card">
							<div className="card-header">
								Subject List <Link to={window.APP_URL+'/subject-frm'} className="btn btn-sm btn-primary float-end">Add</Link>
							</div>
							<div className="card-body">
								<Table striped bordered hover>
							      	<thead>
							      		<tr>
							      			<th colSpan="4">
								      			<span className="total">Total: <Badge bg="danger">{total}</Badge></span>
								      			<span style={{float: "right"}}> 
								      				<Form>          
		        										<Form.Control onChange={handleSearch} value={search}  type="text" placeholder="Enter the subject" />		      											 
		      										</Form>
	      										</span>
	      									</th>
							      		</tr>
								        <tr>
								          	<th>#</th>
								          	<th>Subject</th>
								          	<th>Class Name</th>
								          	<th>Action</th> 
								        </tr>
							      	</thead>
							      	<tbody>
							      		{


							      			(Array.isArray(subjectList) && subjectList.length >0 ) ? 
							      			subjectList.map( (item,index) => (
							      				<tr>
										      	 	<td>{ sno+ index+1}</td>
										      	 	<td>{item.subject_name}</td>
										      	 	<td>{item.class_id.class_name}</td>
										      	 	<td><Link to={window.APP_URL+'/subject-frm/'+item._id} className="btn btn-sm btn-info">Edit</Link> | <Link onClick={() => handleDelete(item._id)} className="btn btn-sm btn-danger">Delete</Link></td>
										      	 </tr>
							      				))
							      			
									      	 : ''
							      		}
								      	 
							      	</tbody>
								</Table>

								{ /* Pagination */}
								<Pagination>

								{ totalPages > 0 && [...Array(totalPages)].map((val,index) => (
									  <Pagination.Item  onClick={() => setNewPage(index+1)} className={ 
									  								page === index+1
									  								 ? 'active':''
									  							} >{index + 1}</Pagination.Item>

									))
								} 
							     
							      {/*<Pagination.Item active>{2}</Pagination.Item>
							     
							      <Pagination.Item disabled>{3}</Pagination.Item>
*/}
							    
							    </Pagination>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
}
export default SubjectList