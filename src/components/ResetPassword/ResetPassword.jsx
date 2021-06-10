import React, { useRef, useState } from "react";
import styles from "./ResetPassword.module.css";
import { Alert, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ResetPassword() {
	const emailRef = useRef();
	const { resetPassword, currentUser } = useAuth();
	const [errorMsg, setErrorMsg] = useState("");
	const [message, setMessage] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			setMessage("");
			setErrorMsg("");
			await resetPassword(emailRef.current.value);
			setMessage(
				"An email has been sent to the given email address. Please refer to the email for further instructions."
			);
		} catch (err) {
			setErrorMsg("" + err);
		}
	}

	return (
		<div className={styles.mainBox}>
			<h2>Reset Password</h2>
			<form onSubmit={handleSubmit}>
				{errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
				{message && <Alert variant="success">{message}</Alert>}
				<div className={styles.inputBox}>
					<p>Please enter your account email address</p>
					<TextField inputRef={emailRef} type="email" label="Email" variant="filled" />
				</div>
				<Button variant="primary" type="submit">
					Reset Password
				</Button>
			</form>
			{!currentUser && (
				<div className={styles.signUp}>
					<h6>Don't have an account?</h6>
					<Link to="/sign-up">Sign up!</Link>
				</div>
			)}
		</div>
	);
}
