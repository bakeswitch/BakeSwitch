import React from "react";
import { Switch, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import ProductAllergens from "./ProductAllergens";
import ProductContactBaker from "./ProductContactBaker";

function ProductNavPages(props) {
	return (
		<Switch>
			<Route path="/bake-product/details" component={ProductDetails} />
			<Route path="/bake-product/reviews" component={ProductReviews} />
			<Route path="/bake-product/allergens" component={ProductAllergens} />
			<Route path="/bake-product/contact" component={ProductContactBaker} />
			{/* <Route exact path="/store/information" component={Information} />
			<Route exact path="/store/orders" component={Orders} />
			<Route exact path="/store/products" component={Products} />
			<Route exact path="/store/reviews" component={Reviews} /> */}
		</Switch>
	);
}

export default ProductNavPages;
