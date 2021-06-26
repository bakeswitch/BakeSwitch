import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./SearchResults.module.css";
import { db } from "../../config/firebase";

function createColCard(bakeID) {
	const [bakeData, setBakeData] = useState();
	const [orderedPriceAndQty, setOrderedPriceAndQty] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const bakeRef = db.collection("bakes").doc(bakeID);
	
	async function fillBakeData(bakeID) {
		bakeRef.get()
			.then((snapshot) => {
				if (snapshot && snapshot.exists) {
					setBakeData(snapshot.data());
					// alert("bakeData set");
				} else {
					alert('snapshot doesnt exist');
				}
			}).catch((err) => alert("setBakeObj error: " + err));
	}

	function fillOrderedPriceAndQty(bakeData) {
		if (bakeData != null) {
			// alert(JSON.stringify(bakeData)); //testline
			const { bakePriceArr: orderedPriceArr, bakePriceAndQty: unorderedMapPriceAndQty } = bakeData;
			//assumes bakePriceArr is sorted already in asending order!
			orderedPriceArr.forEach(price => { //may need to sort first
				const respQty = unorderedMapPriceAndQty[price];
				setOrderedPriceAndQty((prevOrderedPriceAndQty) => ({
					...prevOrderedPriceAndQty,
					[price]: respQty
				}));
			});
		} else {
			alert("bakeData is empty");
		}
	}

	function getRealTimeUpdates() {
		bakeRef.onSnapshot((snapshot) => {
			if (snapshot && snapshot.exists) {
				fillOrderedPriceAndQty(snapshot.data());
			} else {
				alert("snapshot doesnt exist for realtime update");
			}
		})
	}
	
	useEffect(() => {
		setIsLoading(true);
		fillBakeData(bakeID);
		getRealTimeUpdates();
		setIsLoading(false);
	},[]);
	
	if (bakeData == null) {
		return <p>Error loading bakeCard, bakeObj undefined</p>;
	}
	
	//pass in default values in case can't read fields
	const { bakeName ='default_bake_name', 
			storeID  ='default_store_id',
			bakeDesc = 'default_bake_desc',
			bakePhotoURL = 'default_bake_photo' } = bakeData;
	
	
	return !isLoading && ( 
		<Col>
			<Card className={styles.card}>
				<Card.Img
					className={styles.cardImg}
					variant="top"
					src={bakePhotoURL}
				/>
				<Card.Body className={styles.cardBody}>
					<Card.Title className={styles.maxLines}>{bakeName}</Card.Title>
					<Card.Text>
						<p className={styles.maxLines}>
							{bakeDesc}
						</p>
					</Card.Text>
					<Card.Text className={styles.cardFooter}>
						<p>
							from S${Object.keys(orderedPriceAndQty)[0]} dollars onwards
							<br />
							by <Card.Link>{storeID}</Card.Link>
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

		//Search by quering and get the list of bake_id
		// const bakeCollection = db.collection("bakes").where("store");
	}

	const itemDetails = {
		title: "Chocolate Cookies",
		price: "$12",
		sellerName: "seller123",
	};

	//REPLACE W SEARCH RESULTS WHEN CODE IS READY
	const searchResultsBakeIDArr = ["bake_1234", "bake_4213","bake_2222"];

	return (
		!isLoading && (
			<Row xs={2} md={4} className="mb-4 mt-4">
				{/* <Col>{JSON.stringify(bakeDetailsArr[0])}</Col>
                <Col>bakedocarr length: {bakeDocArr.length}</Col>
                <Col>{JSON.stringify(bakeArr)}</Col> */}

				{searchResultsBakeIDArr.map((bakeID) => createColCard(bakeID))}
			</Row>
		)
	);
}
