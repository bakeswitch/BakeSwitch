import React from "react";
import OrdersView from "../components/OrdersView";
import styles from "./pages.module.css";

export default function OrderCart() {
	return (
		<div className={styles.contentBox}>
			<OrdersView />
		</div>
	);
}
