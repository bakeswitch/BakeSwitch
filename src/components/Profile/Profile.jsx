import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import { Button } from "react-bootstrap";
import BuyerProfile from "./BuyerProfile";
import DeleteAccount from "./DeleteAccount";
import styles from "./Profile.module.css";

export default function Profile() {
	const { currentUser } = useAuth();
	// Get current user id to identify document in database
	const uid = currentUser.uid;
	// Get reference to user document from database
	const userRef = db.collection("users").doc(uid);
	const [userRec, setUserRec] = useState();
	const [loading, setLoading] = useState(true);
	const [delAcc, setDelAcc] = useState(false);

	useEffect(() => {
		// onSnapshot provides real time updates
		userRef.onSnapshot(function (doc) {
			if (doc && doc.exists) {
				setUserRec(doc.data());
			}
			setLoading(false);
		});
	}, []);

	return (
		!loading && (
			<>
				<BuyerProfile userRef={userRef} userRec={userRec} />
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
