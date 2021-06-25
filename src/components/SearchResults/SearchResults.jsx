import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./SearchResults.module.css";
import { db } from "../../config/firebase";

function createColCard(bakeID) {
	const [bakeObj, setBakeObj] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const bakeRef = db.collection("bakes").doc(bakeID);

	bakeRef
		.get() //gets promise
		.then((snapshot) => setBakeObj(snapshot.data()))
		.catch((err) => "setBakeObj error: " + err)
		.finally(() => setIsLoading(false));

	if (!bakeObj) {
		return <p>Error loading bakeCard, bakeObj undefined</p>;
	}

	const { bakeName, bakePriceAndQuantity, bakeStoreUID } = bakeObj;

	return (
		<Col>
			<Card className={styles.card}>
				<Card.Img
					className={styles.cardImg}
					variant="top"
					src="https://cdn.pixabay.com/photo/2019/12/15/17/06/cookie-4697591__340.jpg"
				/>
				<Card.Body className={styles.cardBody}>
					<Card.Title>{bakeName}</Card.Title>
					<Card.Text>
						<p className={styles.itemDescTruncate}>
							Crunchy outside gooey inside, dark chocolate drizzle
						</p>
						<p>
							from {bakePriceAndQuantity[0]} dollars onwards
							<br />
							by <Card.Link>{bakeStoreUID}</Card.Link>
						</p>
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
}

export default function SearchResults() {
	const [bakeIDArr, setBakeIDArr] = useState([]); //array of bakeID strings
	const [isLoading, setIsLoading] = useState(false);

	function fillBakeIDArr() {
		setBakeIDArr([]);
		setIsLoading(true);

		const storeRef = db.collection("stores").doc("storeUID");

		storeRef
			.get() // promise of storeDoc
			.then((snapshot) => {
				alert(snapshot.data().bakesArr.toString());
				setBakeIDArr(snapshot.data().bakesArr); //PROBLEMLINE
			}) //stores bakeIDs in bakeArr
			.catch((err) => alert("err unable to set bakeArr: " + err))
			.finally(() => setIsLoading(false));
	}

	const itemDetails = {
		title: "Chocolate Cookies",
		price: "$12",
		sellerName: "seller123",
	};

	useEffect(() => {
		// fillBakeIDArr();
		// setIsLoading(false);
	}, []);

	return (
		!isLoading && (
			<Row xs={2} md={4} className="mb-4 mt-4">
				{/* <Col>{JSON.stringify(bakeDetailsArr[0])}</Col>
                <Col>bakedocarr length: {bakeDocArr.length}</Col>
                <Col>{JSON.stringify(bakeArr)}</Col> */}

				{[1, 2, 3, 4, 5, 6, 7, 8].map((bakeID) => createColCard("bakeUID"))}
			</Row>
		)
	);
}
