import React from "react";
import styles from "./pages.module.css";
import UserOrders from "../components/UserOrders/";

export default function OrderCart() {
	return (
		<div className={styles.contentBox}>
			<UserOrders />
		</div>
	);
}
