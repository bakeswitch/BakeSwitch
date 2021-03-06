import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./SearchResults.module.css";
import { db } from "../../config/firebase";

import { LoadBakeCard } from "../BakeCard/LoadBakeCard";
import ErrorCard from "../helperComponents/ErrorCard";

// Takes in searchTag, storeIDArr
export default function SearchResults(props) {
	const { searchTag, 
			searchStoreID } = props;
	const [bakeIDArr, setBakeIDArr] = useState([]); //array of bakeID strings
	const [isLoading, setIsLoading] = useState(true);
	const bakeRef = db.collection("bakes");


	function fillBakeIDArr() {
		// setBakeIDArr([]);
		// alert('i ran inside fillBakeIDArr()');
		let queryResults;

		// const queryResults = 
		// 	(searchTag == "" && storeIDArr.length == 0) ? bakeRef
		// 	(searchTag == "" && storeIDArr.length != 0) ? bakeRef.where("storeID", "in", storeIDArr)
		// 	(searchTag != "" && storeIDArr.length == 0) ? bakeRef.where("bakeTags", "array-contains", searchTag)
		// 												: bakeRef
		// 													.where("bakeTags", "array-contains", searchTag)
		// 													.where("storeID", "in", storeIDArr);
		//4 Use Cases
		// if no search tag and no stores
		if (searchTag == "" && searchStoreID == "") {
			// alert('1st');
			queryResults = bakeRef;
		// if no search tag and there are stores parsed
		} else if (searchTag == "" && searchStoreID != "") {
			// alert('2nd');
			queryResults = bakeRef.where("storeID", "==", searchStoreID);
		} else if (searchTag != "" && searchStoreID == "") {
			// alert('3rd');
			queryResults = bakeRef.where("bakeTags", "array-contains", searchTag);
		} else { //if both searchTag and searchStoreID populated
			// alert('4th');
			queryResults = bakeRef
				.where("bakeTags", "array-contains", searchTag)
				.where("storeID", "==", searchStoreID);
		}
		// const queryResults = bakeRef
		// 	.where("bakeTags", "array-contains", searchTag)
		// 	.where("storeID", "in", storeIDArr);
		queryResults
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					setBakeIDArr((prevArr) => {
						return [...prevArr, doc.id];
					});
				});
			})
			// .then(() => {
			// 	alert("Inside func aft setting bakeID: bakeIDArr is " + JSON.stringify(bakeIDArr));
			// })
			.catch((error) => {
				alert("Search Error. " + error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	useEffect(() => {
		setBakeIDArr([]);
		// alert("i ran inside useEfect");
		// alert("searchTag: " + searchTag + ", storeIDArr: " + storeIDArr);
		fillBakeIDArr()
		// setBakeIDArr([]); //this code doesnt make sense ya?
		return () => {
			setBakeIDArr([]);
		};
	}, [searchTag, searchStoreID]);

	/* PROB: After changing baker name, change bake tag, and there would be a problem of duplicate bakes
	click search again and it will clear
	Prob cause: 2 useEffect runs & Code breaks if runs twice
	Soln? Pls fix both problems */
	
	//DIRTY FIX PLEASE DONT USE AND FIND A PROPER FIX TO DUPLICATE ID PROBLEM
	const uniqBakeIDArr = [...new Set(bakeIDArr)];

	if (isLoading) {
		return (
			<Row xs={2} md={4} className="mb-4 mt-4">
				loading...
			</Row>
		);
	} else {
		return (
			<Row xs={2} md={4} className="mb-4 mt-4">
				{/* TEST OUPUT =>
				<Col>{JSON.stringify(bakeDetailsArr[0])}</Col>
				<Col>bakedocarr length: {bakeDocArr.length}</Col> */}
				{/* <Col>{JSON.stringify(bakeIDArr)}</Col> */}

				{/* {uniqBakeIDArr.map((bakeID) => ( */}
				{/* Resolve unique key ID error */}
				{bakeIDArr.map((bakeID) => (
					<Col
						// display={bakeID? 'none': 'block'}
						key={"col_" + bakeID}
					>
						<LoadBakeCard bakeID={bakeID} />
					</Col>
				))}
				{/* <Col>searchTag:{searchTag}</Col>
				<Col>bakeIDArr:{JSON.stringify(bakeIDArr)}</Col> */}
			</Row>
		);
	}
}
