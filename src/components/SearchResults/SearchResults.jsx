import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./SearchResults.module.css";
import { db } from "../../config/firebase";
import { useHistory } from "react-router-dom"
import DisplayBakeCard from "../DisplayBakeCard";

function ErrorCard() {
	return (
		<Card>
			<p>Error loading bakeCard, bakeObj undefined</p>
		</Card>
	);
}

//returns array of arrays [price, qty] which is sorted by price in ascending order
export function orderPriceAndQtyArr(bakeData) {
	// const [orderedPnQ, setOrderedPnQ] = useState({});
	if (bakeData != null) {
		const { bakePriceAndQty: unorderedPnQ } = bakeData;
		const unorderedKeys = Object.keys(unorderedPnQ);
		const orderedPnQArr = unorderedKeys
			.sort(function(a, b){return a-b}) 			//sort keys in ascending order [1,2,3]
			.map(price => [price, unorderedPnQ[price]]); //place them in nested array [1:q, 2:q, 3:q]
		// alert(orderedPnQArr.toString());
		return orderedPnQArr;
	} else {
		return alert("bakeData is empty");
	}
}

function createColCard(bakeID) {
	const [bakeData, setBakeData] = useState();
	const [orderedPriceAndQtyArr, setOrderedPriceAndQtyArr] = useState([["default_price","default_qty"]]);
	const [isLoading, setIsLoading] = useState(false);
	const bakeRef = db.collection("bakes").doc(bakeID);
	const history = useHistory();
	
	function fillBakeData() {
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

	function getRealTimeUpdates() {
		bakeRef.onSnapshot((snapshot) => {
			if (snapshot && snapshot.exists) {
				// alert(JSON.stringify(snapshot.data())); //runs here
				const orderedPnQArr = orderPriceAndQtyArr(snapshot.data());
				// alert(JSON.stringify(orderedPnQ)); //Doesnt run here
				setOrderedPriceAndQtyArr(orderedPnQArr);
			} else {
				alert("snapshot doesnt exist for realtime update");
			}
		})
	}
	
	useEffect(() => {
		try {
			setIsLoading(true);
			fillBakeData();
			getRealTimeUpdates();
		} finally {
			setIsLoading(false);
		}
	},[]);
	
	if (!bakeData) { 
		return ErrorCard() 
	}
	
	//pass in default values in case can't read fields
	const { bakeName 		= 'default_bake_name', 
			storeID  		= 'default_store_id',
			bakeDesc 		= 'default_bake_desc',
			bakePhotoURL 	= 'default_bake_photo' } = bakeData;
	
	function handleOnClick() {
		history.push(`/bake-product/${bakeID}`);
	}
	
	return !isLoading && ( 
		<DisplayBakeCard 
			key = {"displayBakeCard_" + bakeID}
			bakeID = {bakeID}
			handleOnClick = {handleOnClick}
			bakePhotoURL = {bakePhotoURL}
			bakeName = {bakeName}
			bakeDesc = {bakeDesc}
			orderedPriceAndQtyArr = {orderedPriceAndQtyArr}
			storeID = {storeID}
		/>
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
	const searchResultsBakeIDArr = ["bake_1234", "bake_4213", "bake_2222"];

	return (
		!isLoading && (
			<Row xs={2} md={4} className="mb-4 mt-4">
				{/* <Col>{JSON.stringify(bakeDetailsArr[0])}</Col>
                <Col>bakedocarr length: {bakeDocArr.length}</Col>
                <Col>{JSON.stringify(bakeArr)}</Col> */}

				{searchResultsBakeIDArr.map((bakeID) =>
					createColCard(bakeID)
				)}
			</Row>
		)
	);
}
