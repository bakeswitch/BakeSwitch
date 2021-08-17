import React, { useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import ProductAllergens from "./ProductAllergens";
import ProductContactBaker from "./ProductContactBaker";
import styles from "./ProductNavPages.module.css";


// function ErrorTabs(errString) {
// 	return (
// 		<Tabs
// 			id="productTabs"
// 			activeKey={key}
// 			onSelect={(k) => setKey(k)}
// 			className="mb-3 ms-2 text-align-left"
// 		>
// 			<Tab eventKey="details" title="details">
// 				<h3> Sorry, we are unable to load the data </h3>
// 				<p> Error: {errString} </p>
// 			</Tab>
// 			<Tab eventKey="reviews" title="reviews">

// 			</Tab>
// 			<Tab eventKey="allergens" title="allergens">

// 			</Tab>
// 			<Tab eventKey="contact" title="contact">

// 			</Tab>
// 		</Tabs>
//   );
// }

function ProductNavPages(props) {
	const bakeData = props.bakeData;
	const storeData = props.storeData;
	const orderedPnQArr = props.orderedPnQArr;
	const [key, setKey] = useState('details');

	// if (!(bakeData && storeData && orderedPnQArr)) {
	// 	return ErrorTabs();
	// }

  	return (
		<Tabs
			id="productTabs"
			activeKey={key}
			onSelect={(k) => setKey(k)}
			className="mb-3 ms-2 text-align-left"
		>
			<Tab className={styles.tab} eventKey="details" title="details">
				<ProductDetails 
					bakeData = {bakeData}
					orderedPnQArr = {orderedPnQArr}
				/>
			</Tab>
			{/* Temp disabled till implemented*/}
			{/* <Tab className={styles.tab} eventKey="reviews" title="reviews">
				<ProductReviews/>
			</Tab> */}
			<Tab className={styles.tab} eventKey="allergens" title="allergens">
				<ProductAllergens
					bakeData = {bakeData}
				/>
			</Tab>
			<Tab className={styles.tab} eventKey="contact" title="contact">
				<ProductContactBaker 
					storeData = {storeData}
				/>
			</Tab>
		</Tabs>
  );
}

export default ProductNavPages;
