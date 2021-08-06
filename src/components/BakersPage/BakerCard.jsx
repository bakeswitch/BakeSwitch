import React, { useState, useEffect } from "react";
import { Card, Image, Button } from "react-bootstrap";
import styles from "./BakersPage.module.css";
import { db } from "../../config/firebase";
import { useHistory } from "react-router-dom";

export default function BakerCard(props) {
	const [storeRec, setStoreRec] = useState();
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	useEffect(
		() =>
			db
				.collection("stores")
				.doc(props.storeID)
				.get()
				.then((snapshot) => setStoreRec(snapshot.data()))
				.then(() => setLoading(false)),
		[]
	);

	function handleClick() {
		history.push(`/bakerProfile/${props.storeID}`);
	}

	return (
		!loading && (
			<div className={styles.bakerBox}>
				<Image
					src={storeRec?.storeLogo}
					alt="Store picture"
					roundedCircle
					className={styles.storeImg}
				/>
				<Card className={styles.bakerCard}>
					<Button variant="light" onClick={handleClick}>
						<Card.Header className={styles.buttonHeader} as="h5">{storeRec.storeName}</Card.Header>
					</Button>
					<Card.Body className={styles.bakerDesc}>
						<Card.Text>{storeRec.storeDesc}</Card.Text>
					</Card.Body>
				</Card>
			</div>
		)
	);
}
