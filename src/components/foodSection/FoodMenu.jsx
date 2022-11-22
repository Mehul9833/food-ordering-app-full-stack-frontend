import React from "react";
import { Container, Card, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const FoodMenu = (props) => {
	return (
		<Container className="food__menu">
			<Row>
				{props.foodData.map((food, key) => {
					return (
						<Col key={key}>
							<Card className="food__menu-card">
								<Link to={`/food-items/${food.name}`}>
									<img src={food.image} alt={food.name} />
									<h5>{food.name}</h5>
								</Link>
							</Card>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

export default FoodMenu;
