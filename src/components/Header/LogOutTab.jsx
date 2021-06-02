import React from "react";
import Nav from "react-bootstrap/Nav";
import styles from "./Header.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function LogOutTab() {
	const { logOut } = useAuth();
	const history = useHistory();

	async function handleLogOut() {
		await logOut();
		// Redirects to home page after log out
		history.push("/");
		alert("You are logged out.");
	}

	return (
		<div className={styles.tab}>
			<Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
		</div>
	);
}
