import React, { useState } from "react";
import styles from "./SellerOrders.module.css";
import AddOrder from "./AddOrder";
import OrdersView from "./OrdersView";

export default function SellerOrders(props) {
	const storeID = props.storeID;

	return (
		<div className="mt-5 mb-4">
			<h3>My Order Records</h3>
			<AddOrder storeID={storeID} />
			<OrdersView storeID={storeID} />
		</div>
	);
}
