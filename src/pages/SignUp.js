import React, { useState } from "react";
import SignUpBuyer from "../components/SignUpBuyer";
import SignUpSeller from "../components/SignUpSeller";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./pages.module.css";

export default function SignUp() {
	const [signUpCategory, setSignUpCategory] = useState(-1);

	function handleBuyer() {
		setSignUpCategory(0);
	}

	function handleSeller() {
		setSignUpCategory(1);
	}

	return (
		<div className={styles.signUpBox}>
			<h2>Sign Up</h2>
			<Container>
				<Row>
					<Col>
						{" "}
						<Button variant="primary" size="lg" onClick={handleBuyer}>
							Buyer
						</Button>
					</Col>
					<Col>
						{" "}
						<Button variant="primary" size="lg" onClick={handleSeller}>
							Seller
						</Button>
					</Col>
				</Row>
			</Container>
			{signUpCategory == -1 ? null : signUpCategory == 0 ? (
				<SignUpBuyer />
			) : signUpCategory == 1 ? (
				<SignUpSeller />
			) : null}
		</div>
	);
}
