import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const DishesMenuFrmRow = ({index, menu, onChange, onClick,}) => {

	return (

		<tr>
      		<td>{index + 1}</td>
      		<td>
      			<Form.Group className="mb-3"> 
			        <Form.Control value={menu.name} name="name" onChange={onChange} type="text" placeholder="Enter Menu Name" />
			    </Form.Group>
			</td>
			<td>
      			<Form.Group className="mb-3"> 
			        <Form.Control  value={menu.price} name="price" onChange={onChange} type="text" placeholder="Enter Price" />
			    </Form.Group>
			</td>
			<td>
      			<Form.Group className="mb-3"> 
			        <Form.Control    name="image" onChange={onChange}  type="file" placeholder="Enter Image" />
			    </Form.Group>
			</td>
			<td>
				<Form.Group className="mb-3">
		      	 <Button type="button" variant="danger"  onClick={onClick} className="btn btn-sm">Remove</Button>
		      </Form.Group>
		    </td>
		</tr>
		)
}

export default DishesMenuFrmRow;