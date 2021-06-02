import React, { useState, useRef } from "react";
import styles from "./LogInBox.module.css";
import { Button, TextField } from "@material-ui/core";
import GoogleButton from "react-google-button";

function LogInBox(props) {
	const [loginInput, setLoginInput] = useState({
		email: "",
		password: "",
	});

	function handleChange(event) {
		const { name, value } = event.target;
		setLoginInput((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function submitChange(event) {
		setLoginInput({
			email: "",
			password: "",
		});
		props.passwordSignIn(loginInput.email, loginInput.password);
	}

	return (
		<div className={styles.mainBox}>
			<h2>Log In</h2>
			<div className={styles.googleLogIn}>
				<GoogleButton label="Log in with Google" onClick={props.googleSignInFunc} />
			</div>
			<h6>OR</h6>
			<hr />
			<form>
				<div className={styles.inputBox}>
					<TextField
						name="email"
						type="email"
						onChange={handleChange}
						value={loginInput.email}
						label="Email"
						variant="filled"
					/>
					<TextField
						name="password"
						type="password"
						onChange={handleChange}
						value={loginInput.password}
						label="Password"
						variant="filled"
					/>
				</div>
				<Button variant="contained" color="primary" onClick={submitChange}>
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
