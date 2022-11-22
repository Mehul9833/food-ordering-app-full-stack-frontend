import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardBody, Card, Button } from "reactstrap";
import { getFood, handleRemoveFromCart } from "../../utils/handleApi";

const Cart = (props) => {
	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setCart(props.cartData);
	}, [props.cartData]);

	useEffect(() => {
		calculateTotal();
	}, [cart]);

	function calculateTotal() {
		let sum = 0;
		cart.forEach((item) => {
			sum = sum + item.qty * item.price;
		});

		setTotal(sum);
	}

	function handleIncrement(id) {
		const cartCopy = [...cart];

		cartCopy.forEach((item) => {
			if (item._id === id) {
				item.qty += 1;
			}
		});

		setCart(cartCopy);
	}

	function handleDecrement(id) {
		const cartCopy = [...cart];
		cartCopy.forEach((item) => {
			if (item._id === id) {
				if (item.qty > 1) {
					item.qty -= 1;
				}
			}
		});

		setCart(cartCopy);
		console.log("here");
	}

	return (
		<React.Fragment>
			<Card className="cart">
				<CardBody>
					<table className="cart__table">
						<thead>
							<tr>
								<th>Sr.No</th>
								<th>Image</th>
								<th>Name</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total Amount</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{cart.length !== 0 ? (
								<React.Fragment>
									{cart.map((item, key) => {
										return (
											<tr>
												<td>{key + 1}</td>
												<td>
													<img
														src={item.image}
														alt={item.name}
														width="100px"
														height="80px"
													/>
												</td>
												<td>{item.name}</td>

												<td>₹{item.price}</td>
												<td className="cart__table_inputs">
													<div className="cart__table-buttons">
														<Button
															onClick={() => handleDecrement(item._id)}
															color="info"
														>
															-
														</Button>
														<p className="mb-0 cart__table-buttons-text">
															{item.qty}
														</p>
														<Button
															onClick={() => handleIncrement(item._id)}
															color="info"
														>
															+
														</Button>
													</div>
												</td>
												<td>₹{item.qty * item.price}</td>
												<th>
													<Button
														color="danger"
														onClick={() =>
															handleRemoveFromCart(item, props.setCartData)
														}
													>
														Delete
													</Button>
												</th>
											</tr>
										);
									})}
								</React.Fragment>
							) : (
								<tr className="text-center">
									<p>No Items Added in Cart</p>
								</tr>
							)}
						</tbody>
						<tfoot>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>

								{cart.length !== 0 && (
									<React.Fragment>
										<td>Total: ₹{total}</td>
										<td>
											<Link to="/thankyou">
												<Button color="warning">Order</Button>
											</Link>
										</td>
									</React.Fragment>
								)}
							</tr>
						</tfoot>
					</table>
				</CardBody>
			</Card>
		</React.Fragment>
	);
};

export default Cart;
