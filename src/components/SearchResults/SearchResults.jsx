import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./SearchResults.module.css";
import { db } from "../../config/firebase";

import { LoadBakeCard } from "../BakeCard/LoadBakeCard";
import ErrorCard from "../helperComponents/ErrorCard";

export default function SearchResults(props) {
	const searchTerm = props.searchTerm;
	const isTag = props.isTag;
	const [bakeIDArr, setBakeIDArr] = useState([]); //array of bakeID strings
	// const [tempIDArr, setTempIDArr] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const bakeRef = db.collection("bakes");

	function fillBakeIDArr() {
		setIsLoading(true);
		let queryResults;

		if (isTag) {
			queryResults = bakeRef.where("bakeTags", "array-contains", searchTerm);
		} else {
			queryResults = bakeRef.where("storeID", "==", searchTerm);
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
				alert("Error filtering bakeID from bakeTag: " + error);
			})
			.finally(() => setIsLoading(false));

		setIsLoading(false);
	}

	useEffect(() => {
		if (searchTerm != "") {
			fillBakeIDArr();
		}
		return () => {
			setBakeIDArr([]);
		};
	}, [searchTerm]);

	//REPLACE W SEARCH RESULTS WHEN CODE IS READY
	// const searchResultsBakeIDArr = ["bake_0001", "bake_0002", "bake_0003"];

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
