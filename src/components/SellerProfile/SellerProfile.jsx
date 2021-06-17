import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { db } from "../../config/firebase";

export default function SellerProfile(props) {
	// Takes in storeID as props
	const storeRef = db.collection("stores").doc(props.storeID);
	const [storeRec, setStoreRec] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Retrieve data from document as a document snapshot. Store in storeRec variable.
		storeRef
			.get()
			.then((snapshot) => setStoreRec(snapshot.data()))
			.then(() => setLoading(false));
	}, []);

	return (
		!loading && (
			<Card>
				<Card.Img
					variant="top"
					alt="Image from store"
					src="https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg"
					style={{ width: "100%", height: "300px" }}
				/>
				<Card.Header as="h3" className="mt-3">
					{storeRec.storeName}
				</Card.Header>
				<Card.Body></Card.Body>
			</Card>
		)
	);
}
