import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import ProductAllergens from "./ProductAllergens";
import ProductContactBaker from "./ProductContactBaker";
import styles from "./ProductNavPages.module.css";

export function ErrorTab(errString) {
	<Tab eventKey="details" title="details">
		<Container className={styles.productDetailBox}>
			<h3> Sorry, we are unable to load the data </h3>
            <p> Error: {errString} </p>
        </Container>
	</Tab>
}

function ProductNavPages(props) {
	const bakeData = props.bakeData;
	const storeData = props.storeData;
	const [key, setKey] = useState('home');


  	return (
		<Tabs
			id="productTabs"
			activeKey={key}
			onSelect={(k) => setKey(k)}
			className="mb-3 ms-2 text-align-left"
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
