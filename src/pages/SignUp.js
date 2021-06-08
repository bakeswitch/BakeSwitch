import React, { useState } from "react";
import SignUpBuyer from "../components/SignUpBuyer";
import SignUpSeller from "../components/SignUpSeller";
import { Container, Button, ButtonGroup} from "react-bootstrap";
import styles from "./pages.module.css";

export default function SignUp() {
	/* -1: no buttons pressed
		0: sign up as buyer
		1: sign up as seller */
	const [signUpCategory, setSignUpCategory] = useState('default');

	function handleBuyer() {
		setSignUpCategory("buyer");
	}

	function handleSeller() {
		setSignUpCategory("seller");
	}

	return (
		<div className={styles.formBox}>
			<h1>Create account</h1>
			<div className={styles.logIn}>
				<h6>Already have an account? <span> <a href="/log-in">Log in</a></span></h6>
			</div>
			<ButtonGroup className="d-grid d-md-flex">
				<Button variant="outline-dark" size="lg" onClick={handleBuyer}>
					Sign Up as a Buyer
				</Button>
				<Button variant="outline-dark" size="lg" onClick={handleSeller}>
					Sign Up as a Seller
				</Button>
			</ButtonGroup>

			{signUpCategory == "default" ? null 
				: signUpCategory == "buyer" ? <SignUpBuyer />
					: signUpCategory == "seller" ? <SignUpSeller />
						 : null}
		</div>
	);
}
