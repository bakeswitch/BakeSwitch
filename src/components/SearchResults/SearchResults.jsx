import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./SearchResults.module.css";
import { db } from "../../config/firebase";

import { LoadBakeCard } from "../BakeCard/LoadBakeCard";
import ErrorCard from "../helperComponents/ErrorCard";

// Takes in searchTag, storeIDArr
export default function SearchResults(props) {
	const searchTag = props.searchTag;
	const storeIDArr = props.storeIDArr;
	const [bakeIDArr, setBakeIDArr] = useState([]); //array of bakeID strings
	const [isLoading, setIsLoading] = useState(true);
	const bakeRef = db.collection("bakes");

	function fillBakeIDArr() {
		let queryResults;

		if (!searchTag && storeIDArr.length == 0) {
			queryResults = bakeRef;
		} else if (!searchTag && storeIDArr.length != 0) {
			queryResults = bakeRef.where("storeID", "in", storeIDArr);
		} else if (storeIDArr.length == 0 && searchTag) {
			queryResults = bakeRef.where("bakeTags", "array-contains", searchTag);
		} else {
			queryResults = bakeRef
				.where("bakeTags", "array-contains", searchTag)
				.where("storeID", "in", storeIDArr);
		}

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
			.catch((error) => {
				alert("Search Error. " + error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	useEffect(() => {
		fillBakeIDArr();
		setBakeIDArr([]);
		return () => {
			setBakeIDArr([]);
		};
	}, [searchTag, storeIDArr]);

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
				<Col>bakedocarr length: {bakeDocArr.length}</Col>
				<Col>{JSON.stringify(bakeArr)}</Col> */}

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
