import React from "react";
import LogInBox from "../components/LogInBox";
import styles from "./pages.module.css";
import { useAuth } from "../contexts/AuthContext";
import { Redirect } from "react-router";

export default function LogIn() {
	const { currentUser } = useAuth();

	// Redirect to home page if user is logged in with a verified email
	return !currentUser?.emailVerified ? (
		<div className={styles.formBox}>
			<LogInBox />
		</div>
	) : (
		<Redirect to="/" />
	);
}
