import React, { useState, useRef } from "react";
import styles from "./SignUpBuyer.module.css";
import { Card, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { db } from "../../config/firebase";

const SignUpBuyer = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const phoneRef = useRef();
	const emailRef = useRef();
	const { signUp, logOut } = useAuth();
	const [errors, setErrors] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		setErrors("");

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setErrors("Passwords do not match");
		}

		//SIGN-UP
		try {
			setLoading(true);
			await signUp(emailRef.current.value, passwordRef.current.value).then((userCredential) => {
				var user = userCredential.user;
				sendEmailVer(user); //SEND-EMAIL-VERIFICATION and LOG-OUT
				addUserToDatabase(user);
			});
		} catch (err) {
			const errorCode = err.code;
			switch (errorCode) {
				case "auth/email-already-in-use":
					setErrors("Account with this email already exists");
					break;
				case "auth/invalid-email":
					setErrors("Invalid email");
					break;
				case "auth/weak-password":
					setErrors("Password is too weak");
					break;
				default:
					setErrors("Failed to create an account" + err.message);
			}
		} finally {
			setLoading(false);
		}
	}

	async function sendEmailVer(user) {
		try {
			setLoading(true);
			logOut();
			await user.sendEmailVerification();
			history.push("/log-in");
			alert(
				"Email verification sent. Please check your inbox and verify your email to complete account creation."
			);
		} catch {
			setErrors("Failed to send email verification");
		} finally {
			setLoading(false);
		}
	}

	async function addUserToDatabase(user) {
		const uid = user.uid;
		const userRef = db.collection("users").doc(uid);
		userRef.set({
			username: usernameRef.current.value,
			email: user.email,
			photoURL: user?.photoURL,
			phoneNumber: phoneRef.current.value,
			isSeller: false,
			isNewUser: true,
		});
	}

	return (
		<Card className={styles.mainBox}>
			{errors && <Alert variant="danger">{errors}</Alert>}
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formUsername">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" placeholder="Enter username" ref={usernameRef} required />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" ref={passwordRef} required />
						<Form.Text> Please enter a password that is at least 6 digits long</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formConfirmPassword">
						<Form.Label>Confirm password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							ref={passwordConfirmRef}
							required
						/>
					</Form.Group>

					<Form.Group className="" controlId="formPhoneNumber">
						<Form.Label>Phone number</Form.Label>
						<InputGroup className="mb-2">
							<InputGroup.Prepend>
								<InputGroup.Text>+65</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control type="text" placeholder="Enter your phone number" ref={phoneRef} />
						</InputGroup>
					</Form.Group>

					<Form.Group className="" controlId="formEmail">
						<Form.Label> Email Address </Form.Label>
						<InputGroup className="mb-2">
							<Form.Control
								type="text"
								placeholder="Enter your email address"
								ref={emailRef}
								required
							/>
						</InputGroup>
					</Form.Group>

					<Button disabled={loading} className="mt-3 w-100" variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default SignUpBuyer;
