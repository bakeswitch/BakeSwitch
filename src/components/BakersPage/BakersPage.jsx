import React, { useState, useEffect } from "react";
import BakerCard from "./BakerCard";
import { db } from "../../config/firebase";

export default function BakersPage() {
	const [loading, setLoading] = useState(true);
	const [storeIDArr, setStoreIDArr] = useState([]);

	useEffect(() => {
		db.collection("stores")
			.where("storeName", "!=", false)
			.get()
			.then((querySnapshot) => querySnapshot.forEach((doc) => storeIDArr.push(doc.id)))
			.then(() => setStoreIDArr(storeIDArr))
			.then(() => setLoading(false));
	}, []);

	return (
		!loading && (
			<div>
				{storeIDArr.map((storeID) => (
					<BakerCard storeID={storeID} key={storeID} />
				))}
			</div>
		)
	);
}
