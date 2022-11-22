import React, { useEffect } from "react";
import { deleteAllCartData, getFood } from "../utils/handleApi";
import { Card, CardBody } from "reactstrap";

const ThankyouPage = (props) => {
	useEffect(() => {
		deleteAllCartData();
		getFood(props.setFoodData);
		props.setCartData([]);
	}, [props]);

	return (
		<Card className="thankyou">
			<CardBody>
				<h2>Your order has been successfully placed.</h2>
				<h5>Thank you🥳🥳🥳</h5>
			</CardBody>
		</Card>
	);
};

export default ThankyouPage;
