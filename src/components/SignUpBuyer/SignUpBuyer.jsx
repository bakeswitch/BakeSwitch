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
	const { signUp } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signUp(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch {
			setError("Failed to create an account");
		} 
		setLoading(false);
		
	}

	return (
		<Card className={styles.mainBox}>
			{error && <Alert variant="danger">{error}</Alert>}
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
							<Button id="buttonVerifyEmail">verify</Button>
						</InputGroup>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formVerifyEmail">
						<Form.Control className="" type="number" placeholder="OTP"  ref={emailConfirmRef} required  />
					</Form.Group>

					<Button disabled={loading} className="mt-3" variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default SignUpBuyer;
