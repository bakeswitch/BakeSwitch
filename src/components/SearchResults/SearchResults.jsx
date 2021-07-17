import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./SearchResults.module.css";
import { db } from "../../config/firebase";
import { useHistory } from "react-router-dom"
import BakeCard from "../BakeCard";
import { orderPriceAndQtyArr } from "../../helperFunctions/handleDataFunctions";

import ErrorCard from "../helperComponents/ErrorCard";

//SHIFT DisplayBakeCard to helperComponents!
export function DisplayBakeCard(props) {
	const bakeID = props.bakeID;
		// alert('runs here in dbc');
	const [bakeData, setBakeData] = useState();
	const [orderedPriceAndQtyArr, setOrderedPriceAndQtyArr] = useState([["default_price","default_qty"]]);
	const [isLoading, setIsLoading] = useState(false);

	if (bakeID == "") {
		return "Don't load";
	}

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
		// return (() => {
		// 	setBakeData([]);
		// 	setIsLoading(false);
		// })
	},[]);
	
	if (!bakeData) { 
		return ErrorCard("no bake data") 
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
		<BakeCard 
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

export default function SearchResults(props) {
	const { searchTag, setIsDefault } = props; 	//is this code killing it cos its a constant not a variable
	const [bakeIDArr, setBakeIDArr] = useState([]); //array of bakeID strings
	// const [tempIDArr, setTempIDArr] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const bakeRef = db.collection("bakes");

	function fillBakeIDArr() {
		setIsLoading(true);

		const queryResults = bakeRef.where("bakeTags", "array-contains", searchTag);
		queryResults.get()    
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					setBakeIDArr((prevArr) => {
						return [...prevArr, doc.id];
					});
				});
			})
			.catch((error) => {
				alert("Error filtering bakeID from bakeTag: " + error);
			})
			.finally(() => setIsLoading(false));
		
		setIsLoading(false);
	}

	useEffect(() => {
		if (searchTag != "") {
			fillBakeIDArr();
		}
		return (() => {
			setBakeIDArr([]); 
		})
	}, [searchTag]);


	//REPLACE W SEARCH RESULTS WHEN CODE IS READY
	// const searchResultsBakeIDArr = ["bake_0001", "bake_0002", "bake_0003"];

	if (isLoading) {
		return (
			<Row  xs={2} md={4} className="mb-4 mt-4">
				loading...
			</Row>
		);
	} else {
		return (
			<Row xs={2} md={4} className="mb-4 mt-4">
				{/* TEST OUPUT =>
				<Col>{JSON.stringify(bakeDetailsArr[0])}</Col>
				<Col>bakedocarr length: {bakeDocArr.length}</Col>
				<Col>{JSON.stringify(bakeArr)}</Col> */}

				{/* Resolve unique key ID error */}
				{bakeIDArr.map((bakeID) => 
						<Col 
							// display={bakeID? 'none': 'block'} 
							key={"col_" + bakeID}>
							<DisplayBakeCard
								bakeID = {bakeID}
							/>
						</Col>
				)}
				{/* <Col>searchTag:{searchTag}</Col>
				<Col>bakeIDArr:{JSON.stringify(bakeIDArr)}</Col> */}
			</Row>
		);
	}
}
