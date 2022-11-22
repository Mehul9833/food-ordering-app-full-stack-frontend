import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import FoodMenu from "./components/foodSection/FoodMenu";
import FoodItems from "./components/foodSection/FoodItems";

import Cart from "./components/cartSection.jsx/cart";
import { deleteAllCartData, getCartData, getFood } from "./utils/handleApi";
import ThankyouPage from "./components/ThankyouPage";

function App() {
	const [foodData, setFoodData] = useState([]);
	const [cartData, setCartData] = useState([]);

	useEffect(() => {
		getFood(setFoodData);
		getCartData(setCartData);
		return () => {
			deleteAllCartData();
		};
	}, []);

	return (
		<div className="App">
			<Header cartData={cartData} />
			<Routes>
				<Route path="/" element={<FoodMenu foodData={foodData} />} />
				<Route
					path="/food-items/:id"
					element={
						<FoodItems
							setFoodData={setFoodData}
							setCartData={setCartData}
							foodData={foodData}
						/>
					}
				/>
				<Route
					path="/cart"
					element={
						<Cart
							cartData={cartData}
							setCartData={setCartData}
							setFoodData={setFoodData}
						/>
					}
				/>
				<Route
					path="/thankyou"
					element={
						<ThankyouPage setFoodData={setFoodData} setCartData={setCartData} />
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
