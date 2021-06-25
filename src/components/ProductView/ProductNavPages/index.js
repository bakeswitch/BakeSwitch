import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import ProductAllergens from "./ProductAllergens";
import ProductContactBaker from "./ProductContactBaker";
import styles from "./ProductNavPages.module.css";

function ProductNavPages(props) {
	const [key, setKey] = useState('home');

  	return (
		<Tabs
			id="productTabs"
			activeKey={key}
			onSelect={(k) => setKey(k)}
			className="mb-3 ms-2"
		>
			<Tab eventKey="details" title="details">
				<ProductDetails />
			</Tab>
			<Tab eventKey="reviews" title="reviews">
				<ProductReviews />
			</Tab>
			<Tab eventKey="allergens" title="allergens">
				<ProductAllergens />
			</Tab>
			<Tab eventKey="contact" title="contact">
				<ProductContactBaker />
			</Tab>
		</Tabs>
  );
}

export default ProductNavPages;
