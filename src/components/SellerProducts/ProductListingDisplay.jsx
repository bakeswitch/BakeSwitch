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
	const [pdtAvailability, setPdtAvailability] = useState();
	const [switchLoading, setSwitchLoading] = useState(false);

	useEffect(() => {
		bakeRef.onSnapshot(function (doc) {
			if (doc && doc.exists) {
				setBakeRec(doc.data());
				setPdtAvailability(doc.data().isAvailable);
			}
			setLoading(false);
		});

		// bakeRef
		// 	.get()
		// 	.then((snapshot) => setBakeRec(snapshot.data()))
		// 	.then(() => setLoading(false));
	}, []);

	const handleClose = () => setShowDetails(false);

	function handleSwitchChange() {
		setSwitchLoading(true);
		try {
			bakeRef.update({ isAvailable: !pdtAvailability });
			setPdtAvailability(!pdtAvailability);
		} catch (error) {
			alert("Error. Unable to change product availability");
		} finally {
			setSwitchLoading(false);
		}
	}

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

	return (
		!loading && (
			<div className="mt-2">
				<Card className={styles.card}>
					<Card.Img variant="top" src={bakeRec.bakePhotoURL} />
					<Card.Body>
						<Card.Title className={styles.max2Lines}>{bakeRec.bakeName}</Card.Title>
						<Card.Text className={styles.max3Lines}>{bakeRec.bakeDesc}</Card.Text>
						<Button variant="primary" size="sm" onClick={() => setShowDetails(true)}>
							View more details
						</Button>
						<div className="mt-3">
							<FormControlLabel
								control={
									<Switch
										checked={pdtAvailability == false}
										onChange={handleSwitchChange}
										disabled={switchLoading}
									/>
								}
								label={pdtAvailability ? "Switch to unavailable" : "Unavailable"}
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
