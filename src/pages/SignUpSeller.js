import React, { useState } from "react";
import SellerForm from "../components/SellerForm";
import Button from "react-bootstrap/Button";
import styles from "./pages.module.css";

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
					<Button variant="outline-secondary" size="lg" className={styles.replyButtons} href={"/"}>
						No
					</Button>
				</div>
			)}
			{joinSeller && (
				<div className={styles.formBox}>
					<SellerForm />
				</div>
			)}
		</>
	);
}
