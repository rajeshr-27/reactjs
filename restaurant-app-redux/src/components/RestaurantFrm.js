import React,{useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DishesMenuFrmRow from './DishesMenuFrmRow';
import axios from 'axios';
import {useDispatch,useSelector} from "react-redux";
import {clearMessage,clearError,addRestaurants, updateRestaurant} from '../redux/features/restaurant/restaurantSlice';
import {useParams,useNavigate} from 'react-router-dom';

const RestaurantFrm = () => {

	const {id}  = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {message,error,restaurants} = useSelector((state) => state.restaurant);

	const [frmData,setFrmdata] = useState({
		name:"",
		image:"",
		rating:""
	})

	const [dishesMenu, setDishesMenu] = useState(
		[
			{
				name:"",				
				price:"",
				image:"",
			}
		]
	);

	useEffect(()=> {
		if(id){
			const restaurantInfo = restaurants.find(restaurant => restaurant._id === id);
			if(restaurantInfo){
				 
				setFrmdata({
					...frmData,
					name : restaurantInfo.name,
					image:"",
					rating:restaurantInfo.rating
				})

				setDishesMenu(
					 
					restaurantInfo.menu
					)
			}
		}

	},[])
	const handleAddRow = () => {
		const newDishesMenu =[
				...dishesMenu,
				{
					name:"",				
					price:"",
					image:"",
				}
			] ;
		setDishesMenu(newDishesMenu);
	}

	const handleChange = (e) => {
		const {name,value,files} = e.target;
		setFrmdata({
			...frmData,
			[name]: files ? files[0]:value
		})
	}
	const handleDishesChange = (e,i) => {

		const {name,value,files} = e.target;

		const updateDishesMenu = [...dishesMenu];

		updateDishesMenu[i] = {
			...updateDishesMenu[i],
			[name]:files ? files[0]:value
		}

		setDishesMenu(updateDishesMenu);

	}
	const handleRemove = (i) => {
		const deletedishesMenu  = [...dishesMenu]
		deletedishesMenu.splice(i,1);
		setDishesMenu(deletedishesMenu);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();		
		const postData = new FormData();
		postData.append(`image`, frmData.image);
		postData.append(`data`,JSON.stringify(frmData));
		dishesMenu.forEach((menu,i)=> {
			postData.append(`menu[${i}][name]`, menu.name);
			postData.append(`menu[${i}][price]`, menu.price);
			postData.append(`menuimage_${i}`,menu.image);
			if(id){
				postData.append(`menu[${i}][_id]`, id);
			}			
		})
		if(id){
			
			dispatch(updateRestaurant({id,postData}));
		}else {
			dispatch(addRestaurants(postData));
		}
		
	}

	if(message){
		alert(message)
		dispatch(clearMessage())
		navigate('/restaurant-list', {replace:true})
	}
	if(error){
		alert(error)
		dispatch(clearError())
	}

	console.log(dishesMenu);
	return(
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<div className="card">
						 	<div className="card-header">Restaturant  Form</div>
						 	<div className="card-body">
						 		 <Form onSubmit={handleSubmit} encType="multipart/form-data">
							      <Form.Group as={Row} className="mb-3" >
							        <Form.Label column sm="2">Restaturant Name</Form.Label>
							         <Col sm="10">
							        	<Form.Control name="name" value={frmData.name} onChange={(e)=>handleChange(e)} type="text" placeholder="Enter Restaturant Name" />
							        </Col>
							      </Form.Group>
							      <Form.Group as={Row} className="mb-3">
							        <Form.Label column sm="2">Image</Form.Label>
							         <Col sm="10">
							        	<Form.Control name="image"  onChange={(e)=>handleChange(e)}   type="file"  />
							        </Col>
							      </Form.Group>

							      <Form.Group  as={Row}  className="mb-3">
							        <Form.Label column sm="2">Rating</Form.Label>
							         <Col sm="10">
							        	<Form.Control name="rating" value={frmData.rating} onChange={(e)=>handleChange(e)}  type="text" placeholder="Enter Rating" />
							        </Col>
							      </Form.Group>
							      <Row>
							      	<Col sm="12">
							      		<h4 className="mb-3">Dish Menu</h4>
							      	</Col>
							      </Row>
							      <Row>
							      	<Col sm="12">
							      		 <Table striped bordered hover>
										      <thead>
										        <tr>
										          <th>#</th>
										          <th>Menu Name</th>
										          <th>Price</th>
										          <th>Image</th>
										          <th><Button type="button" variant="success" onClick={handleAddRow} className="btn btn-sm">Add</Button></th>
										        </tr>
										      </thead>
										      <tbody>
										      	{dishesMenu && 
										      		dishesMenu.map(
										      			(menu, i) => (
										      				<DishesMenuFrmRow key={i} index={i} menu={menu} onChange={(e)=>handleDishesChange(e,i)} onClick={() => handleRemove(i)} />

										      			)
										      		)
										      }
										      	
											</tbody>
										</Table>
							      	</Col>
							      </Row>

							      <Form.Group className="mb-3 float-end">
							      	 <Button type="submit" variant="primary" >Submit</Button>
							      </Form.Group>
								</Form>
						 	</div>
						</div>
					</div>
				</div>
			</div>
		)
}

export default RestaurantFrm;