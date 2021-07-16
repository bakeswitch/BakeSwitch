import React from "react";
import { Switch, Route } from "react-router-dom";
// import Dashboard from "./StoreDashboard";
import Products from "./StoreProducts";
import Orders from "./StoreOrders";
// import Reviews from "./StoreReviews";
import Information from "./StoreInformation";

function StorePages(props) {
	return (
		<Switch>
			<Route exact path="/store/orders" component={Orders} />
			<Route exact path="/store/products" component={Products} />
			<Route exact path="/store/information" component={Information} />
			{/* <Route path="/store/dashboard" component={Dashboard} /> */}
			{/* <Route exact path="/store/reviews" component={Reviews} /> */}
		</Switch>
	);
}

export default StorePages;
