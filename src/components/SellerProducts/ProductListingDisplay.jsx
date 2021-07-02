import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { Card, Button, Modal } from "react-bootstrap";
import { FormControlLabel, Switch } from "@material-ui/core";
import ListingContents from "./ListingContents";
import styles from "./SellerProducts.module.css";

export default function ProductListingDisplay(props) {
	const bakeID = props.bakeID;
	const bakeRef = db.collection("bakes").doc(bakeID);
	const [bakeRec, setBakeRec] = useState();
	const [loading, setLoading] = useState(true);
	const [showDetails, setShowDetails] = useState(false);
	const [confDelete, setConfDelete] = useState(false);
	const [unavailable, setUnavailable] = useState(false);

	useEffect(() => {
		bakeRef.onSnapshot(function (doc) {
			if (doc && doc.exists) {
				setBakeRec(doc.data());
			}
			setLoading(false);
		});
		// bakeRef
		// 	.get()
		// 	.then((snapshot) => setBakeRec(snapshot.data()))
		// 	.then(() => setLoading(false));
	}, []);

	const handleClose = () => setShowDetails(false);

	function handleDelete() {
		bakeRef
			.delete()
			.then(() => {
				setShowDetails(false);
				alert("Product listing successfully deleted");
			})
			.catch((error) => {
				alert("Unsuccessful. Product listing not deleted. " + error);
			});
	}

	useEffect(() => bakeRef.update({ isAvailable: !unavailable }), [unavailable]);

	return (
		!loading && (
			<div className="mt-2">
				<Card>
					<Card.Img variant="top" src={bakeRec.bakePhotoURL} />
					<Card.Body>
						<Card.Title>{bakeRec.bakeName}</Card.Title>
						<Card.Text>{bakeRec.bakeDesc}</Card.Text>
						<Button variant="primary" size="sm" onClick={() => setShowDetails(true)}>
							View more details
						</Button>
						<div className="mt-3">
							<FormControlLabel
								control={
									<Switch checked={unavailable} onChange={() => setUnavailable(!unavailable)} />
								}
								label="Switch to unavailable"
							/>
						</div>
					</Card.Body>
				</Card>

				<Modal show={showDetails} onHide={handleClose}>
					<Modal.Header>
						<Modal.Title>{bakeRec.bakeName}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ListingContents bakeRec={bakeRec} />
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" size="sm" onClick={() => setConfDelete(true)}>
							Delete listing
						</Button>
						<Button variant="secondary" size="sm" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
					<Modal.Body>
						{confDelete && (
							<div>
								<h6>Are you sure you want to permanently delete this listing?</h6>
								<Button
									variant="outline-primary"
									size="sm"
									onClick={() => setConfDelete(false)}
									className={styles.delConfButton}
								>
									No
								</Button>
								<Button
									variant="outline-danger"
									size="sm"
									onClick={handleDelete}
									className={styles.delConfButton}
								>
									Yes
								</Button>
							</div>
						)}
					</Modal.Body>
				</Modal>
			</div>
		)
	);
}
