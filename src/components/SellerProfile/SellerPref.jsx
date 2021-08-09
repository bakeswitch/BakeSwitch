import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import styles from "./SellerProfile.module.css";
import UpdateString from "../helperComponents/UpdateString";

function UpdateStorePref(props) {
	const { isOffered,
			hasDetails,
			field,
			docRef } = props;
	const [loading, setLoading] = useState(false);

	function handleChange() {
		setLoading(true);
		try {
			docRef.update({ [field]: !isOffered }).then(() => {
				alert("Successfuly updated option, amend details if necessary")
			});
		} catch (error) {
			alert("unable to update field: " + error);
			// setErr("" + error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Button className="mt-1" variant="outline-warning" onClick={handleChange} disabled={loading}>
				{isOffered ? "Remove option" : "Add option"}
			</Button>
			{/* {err && <Alert variant="danger">{err}</Alert>}
			{msg && <Alert variant="success">{msg}</Alert>} */}
		</>
	);
}

export default function SellerPref(props) {
	const sellerDoc = props.sellerDoc;
	const { deliveryDetails,
			deliveryBool,
			selfCollectionDetails,
			selfCollectionBool } = sellerDoc
	const isOwnStore = props.isOwnStore;
	const storeRef = props.storeRef;

	return (
		<Card body className={styles.tabBox}>
			<Card.Title>
				Delivery 
				{deliveryBool 
					? <span className="badge pill bg-success ms-3">available</span>
					: <span className="badge pill bg-danger ms-3">not available</span>}
			</Card.Title>
			<Card.Text className="p-2" style={{outline:`1px solid rgba(0,0,0,.125)`}}>
				{isOwnStore
					? <UpdateString
						item={deliveryDetails}
						field="deliveryDetails"
						docRef={storeRef}
						isTextArea={true}
					/>
					: deliveryDetails
				}
			{isOwnStore && (
				<UpdateStorePref
					isOffered={deliveryBool}
					hasDetails={deliveryDetails}
					field="deliveryBool"
					docRef={storeRef}
				/>
			)}
			</Card.Text>
			<Card.Title className="pt-2">
				Self-collection
				{selfCollectionBool 
					? <span className="badge pill bg-success ms-3">available</span>
					: <span className="badge pill bg-danger ms-3">not available</span>}
			</Card.Title>
			<Card.Text className="p-2" style={{outline:`1px solid rgba(0,0,0,.125)`}}>
				{isOwnStore 
					? <UpdateString
						item={selfCollectionDetails}
						field="selfCollectionDetails"
						docRef={storeRef}
						isTextArea={true}
					/>
					: selfCollectionDetails
				}
			{isOwnStore && (
				<UpdateStorePref
					isOffered={selfCollectionBool}
					hasDetails={selfCollectionDetails}
					field="selfCollectionBool"
					docRef={storeRef}
				/>
			)}
			</Card.Text>
		</Card>
	);
}
