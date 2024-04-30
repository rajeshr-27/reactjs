import React from 'react';

import {useSelector} from 'react-redux';

const Cart  = () => {

	const {totalPrice} = useSelector((state) => state.restaurant);
	return(

			<div className="cart-container">
				<h2>Cart</h2>
				<div className="cart-content">
					<span style={{color:"brown"}}>Total Price:</span>{totalPrice}
				</div>
			</div>
		)
}

export default Cart;