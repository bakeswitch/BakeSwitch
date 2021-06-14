import React, { useState, useRef } from "react";
import styles from "./ManualSignUp.module.css";
import { Card, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { db } from "../../config/firebase";

const ManualSignUp = () => {
	const { signUp, logOut } = useAuth();
	const history = useHistory();

	const usernameRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const phoneRef = useRef();
	const emailRef = useRef();
	const shopNameRef = useRef();
	const postalCodeRef = useRef();
	const addressRef = useRef();

	const [errors, setErrors] = useState("");
	const [loading, setLoading] = useState(false);
	const [yesSeller, setYesSeller] = useState(false);
	const [showSubmit, setShowSubmit] = useState(false);

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
			isManualSignUp: true,
			isSeller: false,
		});
		if (yesSeller) {
			userRef.update({
				shopName: shopNameRef.current.value,
				postalCode: postalCodeRef.current.value,
				address: addressRef.current.value,
				isSeller: true,
			});
		}
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
						<InputGroup className="mb-3">
							<InputGroup.Prepend>
								<InputGroup.Text>+65</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control type="text" placeholder="Enter your phone number" ref={phoneRef} />
						</InputGroup>
					</Form.Group>
					<Form.Group className="" controlId="formEmail">
						<Form.Label> Email Address </Form.Label>
						<InputGroup className="mb-3">
							<Form.Control
								type="text"
								placeholder="Enter your email address"
								ref={emailRef}
								required
							/>
						</InputGroup>
					</Form.Group>
					<div className={styles.qnBox}>
						<h6>Do you want to register as a seller?</h6>
						<Button
							variant="outline-primary"
							onClick={() => {
								setYesSeller(true);
								setShowSubmit(true);
							}}
							className={styles.replyButtons}
						>
							Yes
						</Button>

						<Button
							variant="outline-secondary"
							onClick={() => {
								setYesSeller(false);
								setShowSubmit(true);
							}}
							className={styles.replyButtons}
						>
							No
						</Button>
					</div>

					{yesSeller && (
						<>
							<Form.Group className="mb-3" controlId="formBakingShopName">
								<Form.Label>Name of Baking Shop</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter shop name"
									ref={shopNameRef}
									required
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formPostal">
								<Form.Label>Postal Code</Form.Label>
								<InputGroup>
									<InputGroup.Text>Singapore</InputGroup.Text>
									<Form.Control type="text" placeholder="Enter postal code" ref={postalCodeRef} />
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formAddress">
								<Form.Label>Address</Form.Label>
								<Form.Control
									type="text"
									placeholder=""
									style={{ height: "4rem" }}
									ref={addressRef}
								/>
							</Form.Group>
						</>
					)}
					{showSubmit && (
						<Button disabled={loading} className="mt-3 w-100" variant="primary" type="submit">
							Submit
						</Button>
					)}
				</Form>
			</Card.Body>
		</Card>
	);
};

export default ManualSignUp;
