import React, { useState, useEffect } from "react";
import styles from "./SellerForm.module.css";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import BasicStoreInfo from "./BasicStoreInfo";
import ContactInfo from "./ContactInfo";

export default function SellerForm(props) {
	const { currentUser } = useAuth();
	const [basicStoreInfo, setBasicStoreInfo] = useState("");
	const [contactInfo, setContactInfo] = useState("");

	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [proceed, setProceed] = useState(false);
	const [basicInfoDone, setBasicInfoDone] = useState(false);
	const [submitDetails, setSubmitDetails] = useState(false);

	async function handleSubmit() {
		setError("");
		setMessage("");
		try {
			setLoading(true);
			await addUserToDatabase();
		} catch (err) {
			setError("Failed to join as a seller. " + err);
		} finally {
			setLoading(false);
			setProceed(true);
			setMessage("Successfully registered as a seller");
		}
	}

	async function addUserToDatabase() {
		const uid = currentUser.uid;
		const userRef = db.collection("users").doc(uid);
		const storeRef = await db.collection("stores").add({
			userID: uid,
		});
		const storeID = storeRef.id;
		db.collection("stores").doc(storeID).update(basicStoreInfo);
		db.collection("stores").doc(storeID).update(contactInfo);
		userRef.update({
			isSeller: true,
			storeID: storeID,
		});
	}

	// Scroll to the top
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [message]);

	return (
		<div className={styles.mainBox}>
			{error && <Alert variant="danger">{error}</Alert>}
			{message && <Alert variant="success">{message}</Alert>}
			{proceed && (
				<Button className="mt-3" variant="primary" href={props.redirect}>
					Proceed
				</Button>
			)}
			<br />
			{!basicStoreInfo && (
				<BasicStoreInfo
					updateFunc={(obj) => {
						setBasicStoreInfo(obj);
						setBasicInfoDone(true);
					}}
				/>
			)}
			<br />
			{basicInfoDone && (
				<ContactInfo
					updateFunc={(obj) => {
						setContactInfo(obj);
						setSubmitDetails(true);
					}}
				/>
			)}
			{submitDetails && (
				<Button
					className="mt-3"
					variant="warning"
					size="lg"
					onClick={handleSubmit}
					disabled={loading}
				>
					Submit
				</Button>
			)}
		</div>
	);
}
