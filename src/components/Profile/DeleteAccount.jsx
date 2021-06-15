import React, { useState, useRef } from "react";
import { Button, Alert, Form } from "react-bootstrap";
import GoogleButton from "react-google-button";
import styles from "./Profile.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { EmailAuthProvider } from "../../config/firebase";

export default function DeleteAccount(props) {
	const { currentUser, googleLogIn } = useAuth();
	const emailRef = useRef();
	const passwordRef = useRef();
	const [reAuth, setReAuth] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [confDel, setConfDel] = useState(false);
	const userRef = props.userRef;

	async function handleReAuth() {
		await setReAuth(true);
		// Scroll to bottom of page
		window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
	}

	async function handleDelete() {
		try {
			// Delete user records form database
			await userRef.delete().then(() => console.log("doc deleted"));
			// Delete user
			await currentUser.delete();
			alert("Account has been deleted.");
		} catch (err) {
			setErrorMsg("Failed to delete account. " + err);
		}
	}

	async function handleGoogleLogIn() {
		try {
			const result = await googleLogIn();
			await currentUser.reauthenticateWithCredential(result.credential).then(() => {
				setReAuth(false);
				setConfDel(true);
			});
		} catch (err) {
			setErrorMsg("Reauthentication failed. " + err);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			const credential = EmailAuthProvider.credential(
				emailRef.current.value,
				passwordRef.current.value
			);
			await currentUser.reauthenticateWithCredential(credential).then(() => {
				setReAuth(false);
				setConfDel(true);
			});
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
					setErrorMsg("Reauthentication failed. " + err.message);
			}
		}
	}

	return (
		<>
			<div>
				<h5>Are you sure you want to permanently delete this account?</h5>
				<Button
					variant="outline-primary"
					onClick={props.setFalseDelAcc}
					className={styles.delConfButton}
				>
					No
				</Button>
				<Button variant="outline-danger" onClick={handleReAuth} className={styles.delConfButton}>
					Yes
				</Button>
			</div>

			{confDel && (
				<Button variant="outline-danger" onClick={handleDelete} className={styles.delConfButton}>
					Confirm delete
				</Button>
			)}

			{reAuth && (
				<div className={styles.reAuthBox}>
					{errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
					<h5>Reauthentication required</h5>
					<p>Please log in below to proceed.</p>
					{/* Display reauthentication method based on the type of account  */}
					{props.isManualSignUp ? (
						<Form onSubmit={handleSubmit}>
							<div>
								<Form.Group>
									<Form.Control type="email" placeholder="Enter email" required ref={emailRef} />
								</Form.Group>
								<Form.Group>
									<Form.Control
										type="password"
										placeholder="Enter password"
										required
										ref={passwordRef}
									/>
								</Form.Group>
								<Button variant="outline-danger" type="submit" className={styles.delConfButton}>
									Log In
								</Button>
							</div>
						</Form>
					) : (
						<div className={styles.googleButton}>
							<GoogleButton label="Google Log-In" onClick={handleGoogleLogIn} />
						</div>
					)}
				</div>
			)}
		</>
	);
}
