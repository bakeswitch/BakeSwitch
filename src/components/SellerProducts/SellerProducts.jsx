import React, { useEffect, useState } from "react";
import ProductListingDisplay from "./ProductListingDisplay";
import AddProduct from "./AddProduct";
import MasterToggler from "./MasterToggler";
import { Row, Col } from "react-bootstrap";
import { db } from "../../config/firebase";

export default function SellerProductDisplay(props) {
	const storeID = props.storeID;
	const [bakeIDArr, setBakeIDArr] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		db.collection("bakes")
			.where("storeID", "==", storeID)
			.get()
			.then((querySnapshot) => querySnapshot.forEach((doc) => bakeIDArr.push(doc.id)))
			.then(() => setBakeIDArr(bakeIDArr))
			.then(() => setLoading(false));
		return () => {
			setBakeIDArr([]);
		};
	}, []);

	return (
		<div className="mt-5 mb-4">
			<h3>My Product Listings</h3>

			<AddProduct storeID={storeID} />

			{!loading && bakeIDArr.length != 0 && (
				<>
					<MasterToggler bakeIDArr={bakeIDArr} />
					<Row sm={1} md={2} lg={3} className="mb-3 mt-4">
						{bakeIDArr.map((bakeID) => (
							<Col key={bakeID}>
								<ProductListingDisplay bakeID={bakeID} />
							</Col>
						))}
					</Row>
				</>
			)}
		</div>
	);
}
