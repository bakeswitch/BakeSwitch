import React, { useState } from "react";
import SellerForm from "../components/SellerForm";
import Button from "react-bootstrap/Button";
import styles from "./pages.module.css";
import SellerForm from "../components/SellerForm/SellerForm";
// Users who use google to create account and those who decide to become a seller after being prompted the first time
// will be directed to this page to register as a seller.
// This can be accesssed through the "Join as a seller" button under profile settings
export default function SignUpSeller() {
	const [joinSeller, setJoinSeller] = useState(false);

	function handleRegisterSeller() {
		setJoinSeller(true);
	}
	return (
		<>
			{!joinSeller && (
				<div className={styles.qnBox}>
					<h4>Do you want to register as a seller?</h4>
					<Button
						variant="outline-primary"
						size="lg"
						onClick={handleRegisterSeller}
						className={styles.replyButtons}
					>
						Yes
					</Button>
					{/* Redirect to home page should "No" be selected */}
					<Button variant="outline-secondary" size="lg" className={styles.replyButtons} href={"/"}>
						No
					</Button>
				</div>
			)}
			{joinSeller && (
				<div className={styles.formBox}>
					<SellerForm redirect="/" />
				</div>
			)}
		</>
	);
}
