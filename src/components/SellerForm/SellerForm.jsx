import React, { useRef, useState } from "react";
import styles from "./SellerForm.module.css";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";

export default function SellerForm() {
	const shopNameRef = useRef();
	const instaRef = useRef();
	const fbRef = useRef();
	const websiteRef = useRef();

	const { currentUser } = useAuth();
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [toHomePage, setToHomePage] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setMessage("");

		try {
			setLoading(true);
			await addUserToDatabase();
		} catch (err) {
			setError("Failed to join as a seller. " + err);
		} finally {
			setLoading(false);
			setMessage("Successfully registered as a seller");
		}
	}

	async function addUserToDatabase() {
		const uid = currentUser.uid;
		const userRef = db.collection("users").doc(uid);
		const storeRef = await db.collection("stores").add({
			userID: uid,
			shopName: shopNameRef.current.value,
			instaLink: instaRef.current.value,
			fbLink: fbRef.current.value,
			websiteLink: websiteRef.current.value,
		});
		const storeID = storeRef.id;
		userRef.update({
			isSeller: true,
			storeID: storeID,
		});
		setToHomePage(true);
	}
	return (
		<Card className={styles.mainBox}>
			{error && <Alert variant="danger">{error}</Alert>}
			{message && <Alert variant="success">{message}</Alert>}
			{toHomePage && (
				<Button className="mt-3" variant="primary" href="/">
					Back to home page
				</Button>
			)}
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formBakingShopName">
						<Form.Label>Name of Baking Shop</Form.Label>
						<Form.Control type="text" placeholder="Enter shop name" ref={shopNameRef} required />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formInsta">
						<Form.Label>Link to Instagram account (Optional)</Form.Label>
						<Form.Control type="text" placeholder="URL link to instagram" ref={instaRef} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formFb">
						<Form.Label>Link to Facebook page (Optional)</Form.Label>
						<Form.Control type="text" placeholder="URL link to facebook" ref={fbRef} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formWebsite">
						<Form.Label>Link to personal website (Optional)</Form.Label>
						<Form.Control type="text" placeholder="URL link to website" ref={websiteRef} />
					</Form.Group>

					{/* <Form.Group className="mb-3" controlId="formPostal">
						<Form.Label>Postal Code</Form.Label>
						<InputGroup>
							<InputGroup.Text>Singapore</InputGroup.Text>
							<Form.Control type="text" placeholder="Enter postal code" ref={postalCodeRef} />
						</InputGroup>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formAddress">
						<Form.Label>Address</Form.Label>
						<Form.Control type="text" placeholder="" style={{ height: "4rem" }} ref={addressRef} />
					</Form.Group> */}
					<Button disabled={loading} className="mt-3" variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}
