import React, { useState, useRef} from "react";
import styles from "./SignUpBuyer.module.css";
import { Card, Form, Button, InputGroup, Alert} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom"

const SignUpBuyer = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const phoneRef = useRef();
	const phoneConfirmRef = useRef();
	const emailRef = useRef();
	const emailConfirmRef= useRef();
	const { signUp, passwordLogIn, logOut } = useAuth();
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		setErrors([]);

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setErrors(prevErrors => [...prevErrors, "Passwords do not match"]);
		}

		//SIGN-UP
		try {
			setLoading(true);
			await signUp(emailRef.current.value, passwordRef.current.value).then((userCredential) => {
				var user = userCredential.user;
				sendEmailVer(user);	 //SEND-EMAIL-VERIFICATION and LOG-OUT
			});
		} catch (err) {
			setErrors(prevErrors => [...prevErrors, "Failed to create an account"]);
			console.log("Failed to create an account");
		} finally {
			setLoading(false);
		}
	}

	async function sendEmailVer(user) {
		try {
			setLoading(true);
			await user.sendEmailVerification();
			logOut();
			alert("Email verification sent");
			history.push('/log-in');
		} catch {
			setErrors(prevErrors => [...prevErrors, "Failed to send email verification"]);
			console.log("Failed to send email verification");
		} finally {
			setLoading(false);
		}
	}

	// async function loginAndCheckVerification() {
	// 	let user;
	// 	try {
	// 		setLoading(true);
	// 		await passwordLogIn(emailRef.current.value, passwordRef.current.value).then((userCredential) => {
	// 			user = userCredential.user;
	// 		});
	// 	} catch {
	// 		return setErrors(prevErrors => [...prevErrors, "Failed to Log In"]);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// 	console.log(user);
	// 	//should not run if failed to login
	// 	if (user.emailVerified) {
	// 		history.push("/");
	// 	} else {
	// 		setErrors(prevErrors => [...prevErrors, "Email not verified yet"]);
	// 	}
	// }

	return (
		<Card className={styles.mainBox}>
			{errors && errors.map(err => <Alert variant="danger">{err}</Alert>)}
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formUsername">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" placeholder="Enter username" ref={usernameRef} required />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" ref={passwordRef} required  />
						<Form.Text> Please enter a password that is at least 6 digits long</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formConfirmPassword">
						<Form.Label>Confirm password</Form.Label>
						<Form.Control type="password" placeholder="Password" ref={passwordConfirmRef} required  />
					</Form.Group>

					{/* <Form.Group className="" controlId="formPhoneNumber">
						<Form.Label>Phone number</Form.Label>
						<InputGroup className="mb-2">
							<InputGroup.Prepend>
								<InputGroup.Text>+65</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control type="text" placeholder="Enter your phone number"  ref={phoneRef} required />
							<Button id="buttonVerifyPhone">verify</Button>
						</InputGroup>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formVerifyPhone">
						<Form.Control className="" type="number" placeholder="OTP"  ref={phoneConfirmRef} required  />
					</Form.Group> */}

					<Form.Group className="" controlId="formEmail">
						<Form.Label> Email Address </Form.Label>
						<InputGroup className="mb-2">
							<Form.Control type="text" placeholder="Enter your email address"  ref={emailRef} required  />
							{/* <Button id="buttonVerifyEmail">verify</Button> */}
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
