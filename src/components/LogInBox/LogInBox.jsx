import React, { useState } from "react";
import styles from "./LogInBox.module.css";
import { Button } from "@material-ui/core";
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
					<input
						name="email"
						type="email"
						placeholder="Email"
						onChange={handleChange}
						value={loginInput.email}
						className={styles.inputText}
					/>
					<input
						name="password"
						type="password"
						placeholder="Password"
						onChange={handleChange}
						value={loginInput.password}
						className={styles.inputText}
					/>
				</div>
				<Button variant="contained" color="primary" onClick={submitChange}>
					Log In
				</Button>
			</form>
			<div className={styles.signUp}>
				<h6>Don't have an account?</h6>
				<a href="">Sign up!</a>
			</div>
		</div>
	);
}

export default LogInBox;
