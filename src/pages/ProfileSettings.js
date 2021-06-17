import React from "react";
import Profile from "../components/Profile";
import styles from "./pages.module.css";

export default function ProfileSettings() {
	return (
		<div className={styles.contentBox}>
			<Profile />
		</div>
	);
}
