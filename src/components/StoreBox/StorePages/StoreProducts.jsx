import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import SellerProducts from "../../SellerProducts/";
import styles from "./StorePages.module.css";

export default function StoreProducts() {
	const { userDoc } = useAuth();

	return (
		<div className={styles.contentBox}>
			<SellerProducts storeID={userDoc.storeID} />
		</div>
	);
}
