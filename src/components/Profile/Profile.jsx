import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import { Button } from "react-bootstrap";
import BuyerProfile from "./BuyerProfile";
import BuyerOrders from "./BuyerOrders";
import DeleteAccount from "./DeleteAccount";
import styles from "./Profile.module.css";

export default function Profile() {
	const { currentUser } = useAuth();
	// Get current user id to identify document in database
	const uid = currentUser.uid;
	// Get reference to user document from database
	const userRef = db.collection("users").doc(uid);
	const [loading, setLoading] = useState(false);
	const [userRec, setUserRec] = useState({});
	const [delAcc, setDelAcc] = useState(false);

	useEffect(() => {
		setLoading(true);
		// Retrieve data from document as a document snapshot. Store in userRec variable.
		userRef
			.get()
			.then((snapshot) => setUserRec(snapshot.data()))
			.then(() => setLoading(false));
	}, []);

	return (
		!loading && (
			<>
				<BuyerProfile userRef={userRef} userRec={userRec} />
				<BuyerOrders />
				{!userRec.isSeller && (
					<Button
						href="/sign-up-seller"
						variant="outline-secondary"
						className={styles.bottomButton}
					>
						Join as a Seller
					</Button>
				)}
				<br />
				{!delAcc && (
					<Button
						variant="outline-danger"
						className={styles.bottomButton}
						onClick={() => setDelAcc(true)}
					>
						Delete Account
					</Button>
				)}
				{delAcc && (
					<DeleteAccount
						userRef={userRef}
						setFalseDelAcc={() => setDelAcc(false)}
						isManualSignUp={userRec.isManualSignUp}
					/>
				)}
			</>
		)
	);
}
