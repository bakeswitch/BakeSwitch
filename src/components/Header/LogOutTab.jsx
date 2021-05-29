import React from "react";
import { Nav } from "react-bootstrap";
import styles from "./Header.module.css";
import { auth } from "../../config/firebase";

export default function LogOutTab() {
	const GoogleSignOut = () => {
		auth.signOut().then(() => auth.currentUser === null && alert("You are logged out."));
	};

	return (
		<div className={styles.tab}>
			<Nav.Link
				onClick={() => {
					GoogleSignOut();
				}}
			>
				Log Out
			</Nav.Link>
		</div>
	);
}
