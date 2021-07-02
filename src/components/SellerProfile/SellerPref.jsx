import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import styles from "./SellerProfile.module.css";
import UpdateString from "../UpdateInfo/UpdateString";

function UpdateStorePref(props) {
	const offersThis = props.offersThis;
	const hasDetails = props.hasDetails;
	const field = props.field;
	const docRef = props.docRef;
	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState("");
	const [err, setErr] = useState("");

	function handleChange() {
		setLoading(true);
		setErr("");
		setMsg("");
		try {
			docRef.update({ [field]: !offersThis }).then(() => {
				let message = "Successfully updated option";
				if (offersThis == true && !hasDetails) {
					message = message + " Please add the details below.";
				}
				setMsg(message);
			});
		} catch (error) {
			setErr("" + error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Button variant="outline-warning" onClick={handleChange} disabled={loading}>
				{offersThis ? "Remove option" : "Add option"}
			</Button>
			{err && <Alert variant="danger">{err}</Alert>}
			{msg && <Alert variant="success">{msg}</Alert>}
		</>
	);
}

export default function SellerPref(props) {
	const sellerDoc = props.sellerDoc;
	const isOwnStore = props.isOwnStore;
	const storeRef = props.storeRef;

	return (
		<Card body className={styles.tabBox}>
			<Card.Title>Delivery details</Card.Title>
			<Card.Text>{sellerDoc.deliveryBool ? sellerDoc.deliveryDetails : "Not offered"}</Card.Text>
			{isOwnStore && (
				<UpdateStorePref
					offersThis={sellerDoc.deliveryBool}
					hasDetails={sellerDoc?.deliveryDetails}
					field="deliveryBool"
					docRef={storeRef}
				/>
			)}
			{isOwnStore && (
				<UpdateString
					item={sellerDoc.deliveryDetails}
					field="deliveryDetails"
					docRef={storeRef}
					isTextArea={true}
				/>
			)}
			<Card.Title>Self-collection details</Card.Title>
			<Card.Text>
				{sellerDoc.selfCollectionBool ? sellerDoc.selfCollectionDetails : "Not offered"}
			</Card.Text>
			{isOwnStore && (
				<UpdateStorePref
					offersThis={sellerDoc.selfCollectionBool}
					hasDetails={sellerDoc?.selfCollectionDetails}
					field="selfCollectionBool"
					docRef={storeRef}
				/>
			)}
			{isOwnStore && (
				<UpdateString
					item={sellerDoc.selfCollectionDetails}
					field="selfCollectionDetails"
					docRef={storeRef}
					isTextArea={true}
				/>
			)}
		</Card>
	);
}
