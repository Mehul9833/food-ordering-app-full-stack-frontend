import axios from "axios";

const baseUrl = "https://food-ordering-backend.onrender.com/";

export const getFood = (setFoodData) => {
	axios.get(baseUrl).then(({ data }) => {
		const duplicateFoodItem = [...data];

		duplicateFoodItem.forEach((food) => {
			const subItemArr = [];
			food.subItems.forEach((subItem) => {
				subItem.isAdded = false;
				subItemArr.push(subItem);
			});
			food["subItems"] = subItemArr;
		});

		setFoodData(duplicateFoodItem);
	});
};

// export const getFoodItem = (setFoodItemsData, foodName) => {
// 	axios.get(`${baseUrl}/${foodName}`).then(({ data }) => {
// 		const duplicateFoodItem = { ...data };
// 		const subItemArr = [];

// 		duplicateFoodItem.subItems.forEach((item, key) => {
// 			const duplicateSubItem = { ...item };
// 			duplicateSubItem["isAdded"] = false;
// 			subItemArr.push({ ...duplicateSubItem });
// 		});

// 		duplicateFoodItem["subItems"] = [...subItemArr];

// 		setFoodItemsData(duplicateFoodItem);
// 	});
// };

export const handleAddToCart = (sendItem, setFoodData) => {
	delete sendItem["isAdded"];
	sendItem["qty"] = 1;
	const data = {
		item: sendItem,
	};

	axios.post(`${baseUrl}addCart`, data).then((data) => {
		// console.log("the data is", data);
	});
};

export const handleRemoveFromCart = (sendItem, setCartItems) => {
	const data = {
		id: sendItem._id,
	};

	axios.post(`${baseUrl}deleteItem`, data).then((data) => {
		// console.log("the data is", data);
		getCartData(setCartItems);
	});
};

export const getCartData = (setCartItems) => {
	axios.get(`${baseUrl}cartData`).then(({ data }) => {
		// console.log("the cart data is", data);
		setCartItems(data);
	});
};

export const deleteAllCartData = (setFood) => {
	axios.post(`${baseUrl}deleteCartData`).then(({ data }) => {
		getFood(setFood);
	});
};
