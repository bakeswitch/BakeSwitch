import React, { useRef } from "react";
import styles from "./LogInBox.module.css";
import { Button, TextField } from "@material-ui/core";
import GoogleButton from "react-google-button";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function LogInBox() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { googleLogIn, passwordLogIn } = useAuth();
	const history = useHistory();

	async function handleGoogleLogIn() {
		await googleLogIn();
		// Redirect to most recent page user was on before logging in
		history.goBack();
	}

	async function handleSubmit(event) {
		event.preventDefault();
		await passwordLogIn(emailRef.current.value, passwordRef.current.value);
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
