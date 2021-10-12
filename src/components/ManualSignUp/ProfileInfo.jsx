import React, { useState, useRef } from "react";
import { Card, Form, Button, InputGroup, Alert } from "react-bootstrap";
import validator from 'validator'
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileInfo(props) {
	const profileInfoOptions = {
		isUsernameOptional : false,
		isPasswordOptional : false,
		isPhoneNumOptional : true,
		isEmailAddressOptional : true,
		passwordMinLen : 6
	}

	const { signUp, logOut } = useAuth();
	const usernameRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const phoneRef = useRef();
	const emailRef = useRef();
	const [errors, setErrors] = useState("");
	const [loading, setLoading] = useState(false);

	const validateProfileInfo = () => {
		if (passwordRef.current.value.length < profileInfoOptions.passwordMinLen) {
			setErrors("Password length is less than min. 6 chars");
			return false;
		}
		else if (passwordRef.current.value !== passwordConfirmRef.current.value && !profileInfoOptions.isPasswordOptional) {
			setLoading(false);
			setErrors("Passwords do not match");
			return false;
		}
		else if (!validator.isEmail(emailRef.current.value) && !profileInfoOptions.isEmailAddressOptional) {
			setLoading(false);
			setErrors("Not a valid email address");
			return false;
		}
		else if (!validator.isMobilePhone(phoneRef.current.value) && !profileInfoOptions.isPhoneNumOptional) {
			setLoading(false);
			setErrors("Not a valid phone number");
			return false;
		}
		return true;
	}

	async function handleSubmit(e) {
		setLoading(true);
		setErrors("");
		e.preventDefault();
		if (!validateProfileInfo()) {
			return;
		}
		props.updateFunc(
			{
				email: emailRef.current.value,
				password: passwordRef.current.value,
			},
			{
				username: usernameRef.current.value,
				phoneNumber: phoneRef.current.value,
			}
		);
		setLoading(false);
	}

	return (
		<Card>
			{errors && <Alert variant="danger">{errors}</Alert>}
			<Card.Header as="h4" className="my-3">
				Profile Information
			</Card.Header>
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
					<Form.Group className="mb-3" controlId="formEmail">
						<Form.Label> Email Address </Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter your email address"
							ref={emailRef}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formPhoneNumber">
						<Form.Label>Phone number</Form.Label>
						<InputGroup className="mb-3">
							<InputGroup.Prepend>
								<InputGroup.Text>+65</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control type="text" placeholder="Enter your phone number" ref={phoneRef} />
						</InputGroup>
					</Form.Group>
					<Button className="mt-3" variant="primary" type="submit" disabled={loading}>
						Submit
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}
