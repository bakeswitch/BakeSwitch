import React from "react";
<<<<<<< HEAD
import Profile from "../components/Profile";

export default function ProfileSettings() {
	return (
		<>
			<Profile />
		</>
=======
import BuyerProfile from "../components/BuyerProfile";
import styles from "./pages.module.css";

export default function ProfileSettings() {
	return (
		<div className={styles.contentBox}>
			<BuyerProfile />
		</div>
>>>>>>> bakesPage
	);
}
