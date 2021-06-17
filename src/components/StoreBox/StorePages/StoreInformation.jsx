import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import SellerProfile from "../../SellerProfile";
import styles from "./StorePages.module.css";

export default function StoreInformation() {
	const { userDoc } = useAuth();

	return (
		<div className={styles.contentBox}>
			<SellerProfile storeID={userDoc.storeID} isOwnStore={true} />
		</div>
	);
}
