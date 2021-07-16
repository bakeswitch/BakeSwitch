import React, { useState } from "react";
import styles from "./SellerOrders.module.css";
import AddOrder from "./AddOrder";

export default function SellerOrders(props) {
	const storeID = props.storeID;
	const [bakeIDArr, setBakeIDArr] = useState([]);
	const [loading, setLoading] = useState(true);

	return (
		<div className="mt-5 mb-4">
			<h3>My Order Records</h3>
			<AddOrder storeID={storeID} />
		</div>
	);
}
