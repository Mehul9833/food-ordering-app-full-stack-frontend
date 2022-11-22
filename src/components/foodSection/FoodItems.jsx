import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	handleAddToCart,
	handleRemoveFromCart,
	getCartData,
} from "../../utils/handleApi";
import { Container, Card, CardBody, Button } from "reactstrap";

const FoodItems = (props) => {
	const [foodItem, setFoodItem] = useState([]);

	const foodName = useParams();

	useEffect(() => {
		getCartData(props.setCartData);
		if (props.foodData.length !== 0) {
			const getFoodItem = props.foodData.filter((food) => {
				return food.name === foodName.id;
			});
			setFoodItem(getFoodItem[0]);
		}
	}, [props.foodData]);

	function handleAddItem(item) {
		handleAddToCart(item);
		const duplicateFoodData = [...props.foodData];
		duplicateFoodData.forEach((food) => {
			const subItemArr = [];
			food.subItems.forEach((subItem) => {
				if (subItem._id === item._id) {
					item.isAdded = true;
					subItemArr.push(item);
				} else {
					subItemArr.push(subItem);
				}
			});
			food["subItems"] = subItemArr;
		});

		setTimeout(() => {
			getCartData(props.setCartData);
		}, 1000);

		props.setFoodData(duplicateFoodData);
	}

	function handleRemoveItem(item) {
		handleRemoveFromCart(item);
		const duplicateFoodData = [...props.foodData];
		duplicateFoodData.forEach((food) => {
			const subItemArr = [];
			food.subItems.forEach((subItem) => {
				if (subItem._id === item._id) {
					item.isAdded = false;
					subItemArr.push(item);
				} else {
					subItemArr.push(subItem);
				}
			});
			food["subItems"] = subItemArr;
		});
		getCartData(props.setCartData);
		props.setFoodData(duplicateFoodData);
	}

	return (
		<Container className="my-5 food__category">
			{foodItem.length !== 0 && (
				<React.Fragment>
					{foodItem.subItems.map((item, key) => {
						return (
							<Card style={{ width: "18rem" }} key={key}>
								<img
									alt="Card cap"
									src={item.image}
									width="100%"
									className="food__menu-img card-img-top"
								/>
								<CardBody>
									<h5>{item.name}</h5>
									<p>{item.description}</p>
									<Button
										color="primary"
										disabled={item.isAdded}
										onClick={() => handleAddItem(item)}
									>
										{item.isAdded ? "Added" : "Add"}
									</Button>
									<Button
										color="danger"
										className="ms-2"
										disabled={!item.isAdded}
										onClick={() => handleRemoveItem(item)}
									>
										Remove
									</Button>
								</CardBody>
							</Card>
						);
					})}
				</React.Fragment>
			)}
		</Container>
	);
};

export default FoodItems;

// {
// 	item.isAdded && <Button color="warning">Remove</Button>;
// }

// {
// 	foodItemsData?.subItems.map((item, key) => {
// 		return (
// 			<Card style={{ width: "18rem" }} key={key}>
// 				<img
// 					alt="Card cap"
// 					src={item.image}
// 					width="100%"
// 					className="food__menu-img card-img-top"
// 				/>
// 				<CardBody>
// 					<h5>{item.name}</h5>
// 					<p>{item.description}</p>
// 					<Button
// 						color="primary"
// 						onClick={() =>
// 							updateFoodItemStatus(item, props.setFoodData, setFoodItemsData)
// 						}
// 					>
// 						{item.isAdded ? "Remove" : "Add"}
// 					</Button>
// 				</CardBody>
// 			</Card>
// 		);
// 	});
// }
