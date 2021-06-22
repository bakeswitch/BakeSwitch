import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import SellerProductDisplay from "./SellerProductDisplay";

export default function SellerProducts(props) {
	const storeID = props.storeID;
	// Takes in storeID as props
	const storeRef = db.collection("stores").doc(storeID);

	// const [pdtRec, setPdtRec] = useState();
	const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	pdtRec
	// 		.get()
	// 		.then((snapshot) => setPdteRec(snapshot.data()))
	// 		.then(() => setLoading(false));
	// }, []);

	return (
		<div>
			<SellerProductDisplay storeID={storeID} />
			<AddProduct storeID={storeID} />
		</div>
	);
}
