import React from "react";
import ManualSignUp from "../components/ManualSignUp";
import styles from "./pages.module.css";
import { Link } from "react-router-dom";

export default function SignUp() {
	return (
		<div className={styles.formBox}>
			<h1>Create Account</h1>
			<div className={styles.loginLink}>
				<h6>Already have an account?</h6>
				<Link to="/log-in">Log In</Link>
			</div>
			<ManualSignUp />
		</div>
	);
}
