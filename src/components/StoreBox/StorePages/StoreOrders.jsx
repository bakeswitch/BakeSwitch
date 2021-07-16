import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import SellerOrders from "../../SellerOrders";
import styles from "./StorePages.module.css";

export default function StoreOrders() {
	const { userDoc } = useAuth();

	return (
		<div className={styles.contentBox}>
			<SellerOrders storeID={userDoc.storeID} />
		</div>
	);
}
