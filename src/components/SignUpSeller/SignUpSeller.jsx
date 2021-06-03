import React from "react";
import styles from "./SignUpSeller.module.css";
import { Form, Button, InputGroup } from "react-bootstrap";

export default function SignUpSeller() {
	return <div className={styles.mainBox}>
		<Form>
			<Form.Group className="mb-3" controlId="formUsername">
				<Form.Label>Username</Form.Label>
				<Form.Control type="text" placeholder="Enter username" />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" />
				<Form.Text> Please enter a password that is at least 6 digits long</Form.Text>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formConfirmPassword">
				<Form.Label>Confirm password</Form.Label>
				<Form.Control type="password" placeholder="Password" />
			</Form.Group>

			<Form.Group className="" controlId="formPhoneNumber">
				<Form.Label>Phone number</Form.Label>
				<InputGroup className="mb-2">
					<InputGroup.Prepend>
						<InputGroup.Text>+65</InputGroup.Text>
					</InputGroup.Prepend>
					<Form.Control type="text" placeholder="Enter your phone number" />
					<Button id="buttonVerifyPhone">verify</Button>
				</InputGroup>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formVerifyPhone">
				<Form.Control className="" type="number" placeholder="OTP" />
			</Form.Group>

			<Form.Group className="" controlId="formEmail">
				<Form.Label> Email Address </Form.Label>
				<InputGroup className="mb-2">
					<Form.Control type="text" placeholder="Enter your email address" />
					<Button id="buttonVerifyEmail">verify</Button>
				</InputGroup>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formVerifyEmail">
				<Form.Control className="" type="number" placeholder="OTP" />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBakingShopName">
				<Form.Label>Name of Baking Shop</Form.Label>
				<Form.Control type="text" placeholder="Enter shop name" />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formPostal">
				<Form.Label>Postal Code</Form.Label>
				<InputGroup>
					<InputGroup.Text>Singapore</InputGroup.Text>
					<Form.Control type="text" placeholder="Enter postal code" />
				</InputGroup>
			</Form.Group>
			
			<Form.Group className="mb-3" controlId="formAddress">
				<Form.Label>Address</Form.Label>
				<Form.Control type="text" placeholder="" style={{height:"4rem"}}/>
			</Form.Group>



			<Button className="mt-3" variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	</div>
;}



