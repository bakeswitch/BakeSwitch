import React from "react";
import BakersPage from "../components/BakersPage";
import styles from "./pages.module.css";

export default function Bakers() {
	return (
		<div className={styles.contentBox}>
			<BakersPage />
		</div>
	);
}
