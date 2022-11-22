import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Button } from "reactstrap";

function Header(props) {
	return (
		<div>
			<Navbar color="primary">
				<Link to="/" className="text-white navbar-brand">
					E-commerce Food App
				</Link>

				<Link to="/cart">
					<Button color="primary" className="d-flex align-items-center">
						<i className="fas fa-cart-plus me-3" />
						<p className="m-0">{props.cartData.length}</p>
					</Button>
				</Link>
			</Navbar>
		</div>
	);
}

export default Header;
