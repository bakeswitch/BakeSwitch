import React, { useRef, useState } from "react";
import styles from "./LogInBox.module.css";
import TextField from "@material-ui/core/TextField";
import GoogleButton from "react-google-button";
import { Alert, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";

function LogInBox() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { googleLogIn, passwordLogIn } = useAuth();
	const [errorMsg, setErrorMsg] = useState("");

	// Add user details to database if user not registered in database.
	// Password is not stored in database but handled by firebase authentication.
	// Optional chaining ?. is used to return a null value for a field should there be no value.
	async function checkUserInDatabase(user) {
		const uid = user.uid;
		const userRef = db.collection("users").doc(uid);
		await userRef.get().then((userRecord) => {
			if (!userRecord.exists) {
				userRef.set({
					username: user?.displayName,
					email: user.email,
					photoURL: user?.photoURL,
					phoneNumber: user?.phoneNumber,
					isSeller: false,
				});
			}
		});
	}

	async function handleGoogleLogIn() {
		try {
			const result = await googleLogIn();
			await checkUserInDatabase(result.user);
		} catch (err) {
			alert("Log-in failed. " + err.message);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		let user;

		try {
			await passwordLogIn(emailRef.current.value, passwordRef.current.value).then(
				(userCredential) => {
					user = userCredential.user;
				}
			);
			if (user.emailVerified) {
				window.location.reload();
			} else {
				setErrorMsg("Please verify your email");
			}
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
					setErrorMsg("Log-in failed. " + err.message);
			}
		}
	}

	return (
		<div className={styles.mainBox}>
			<h1>Log In</h1>
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
					<div className={styles.forgotPassword}>
						<Link to="/forgot-password">Forgot Password?</Link>
					</div>
				</div>
				<Button variant="primary" type="submit">
					Log In
				</Button>
			</form>
			<div className={styles.signUp}>
				<h6>Don't have an account?</h6>
				<Link to="/sign-up">Sign up!</Link>
			</div>
		</div>
	);
}

export default LogInBox;
