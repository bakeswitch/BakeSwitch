import React from "react";
import styles from "./pages.module.css";
import SellerProfile from "../components/SellerProfile";

export default function BakerProfile(props) {
	const storeID = props.storeID;
	return (
		<div className={styles.contentBox}>
			<SellerProfile storeID={storeID} isOwnStore={false} />
		</div>
	);
}
