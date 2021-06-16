import React from "react";
import BuyerProfile from "../components/BuyerProfile";
import styles from "./pages.module.css";

export default function ProfileSettings() {
	return (
		<div className={styles.contentBox}>
			<BuyerProfile />
		</div>
	);
}
