import React, { useState, useEffect } from "react";
import { Card, Image, Button } from "react-bootstrap";
import styles from "./BakersPage.module.css";
import { db } from "../../config/firebase";
import { useHistory } from "react-router-dom";

export default function OrderCard(props) {
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
        alert('ive been clicked');
		// history.push(`/bakerProfile/${props.storeID}`);
	}

	return (
		!loading && (
			<div className={styles.orderBox}>
				<Image
					src= 'https://media.istockphoto.com/photos/different-flavours-cupcakes-picture-id1251444635?b=1&k=6&m=1251444635&s=170667a&w=0&h=jrfRMjs40vlFO9oKNsSrelDcMyRF3MIF-VuXLBUoD3M='
					alt="Bake picture"
					roundedCircle
					className={styles.bakeImg}
				/>
				<Card className={styles.orderCard}>
					<Button variant="light" onClick={handleClick}>
						<Card.Header as="h5">lala</Card.Header>
					</Button>
					<Card.Body className={styles.orderDesc}>
						<Card.Text>lalal</Card.Text>
					</Card.Body>
				</Card>
			</div>
		)
	);
}
