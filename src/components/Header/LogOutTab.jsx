import React from "react";
import { Nav } from "react-bootstrap";
import styles from "./Header.module.css";
import { auth } from "../../config/firebase";

export default function LogOutTab(props) {
	const GoogleSignOut = () => {
		auth.signOut().then(() => !auth.currentUser && alert("You are logged out."));
	};

	return (
		<div className={styles.tab}>
			<Nav.Link
				onClick={() => {
					GoogleSignOut();
					props.onLogOut();
				}}
			>
				Log Out
			</Nav.Link>
		</div>
	);
}
