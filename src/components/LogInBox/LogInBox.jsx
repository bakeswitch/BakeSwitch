import React, { useRef, useState } from "react";
import styles from "./LogInBox.module.css";
import { Button, TextField } from "@material-ui/core";
import GoogleButton from "react-google-button";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function LogInBox() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { googleLogIn, passwordLogIn, currentUser } = useAuth();
	const history = useHistory();
	const [errorMsg, setErrorMsg] = useState("");

	async function handleGoogleLogIn() {
		try {
			await googleLogIn();
			// Redirect to most recent page user was on before logging in
			history.goBack();
			alert("Welcome " + currentUser.displayName + "!");
		} catch (err) {
			alert("Log-in failed. " + err.message);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			await passwordLogIn(emailRef.current.value, passwordRef.current.value);
			alert("Welcome " + currentUser.displayName + "!");
		} catch (err) {
			const errorCode = err.code;
			switch (errorCode) {
				case "auth/invalid-email":
					setErrorMsg("Please enter a valid email");
					break;
				case "auth/user-not-found":
					setErrorMsg("User not found. Please sign up for an account.");
					break;
				case "auth/wrong-password":
					setErrorMsg("Invalid password");
					break;
				default:
					setErrorMsg(err.message);
			}
		}
	}

	return (
		<div className={styles.mainBox}>
			<h2>Log In</h2>
			<div className={styles.googleLogIn}>
				<GoogleButton label="Log in with Google" onClick={handleGoogleLogIn} />
			</div>
			<h6>OR</h6>
			<hr />
			<form onSubmit={handleSubmit}>
				{errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
				<div className={styles.inputBox}>
					<TextField inputRef={emailRef} type="email" label="Email" variant="filled" />
					<TextField inputRef={passwordRef} type="password" label="Password" variant="filled" />
				</div>
				<Button variant="contained" color="primary" type="submit">
					Log In
				</Button>
			</form>
			<div className={styles.signUp}>
				<h6>Don't have an account?</h6>
				<a href="/sign-up">Sign up!</a>
			</div>
		</div>
	);
}

export default LogInBox;
