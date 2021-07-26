import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, Col } from "react-bootstrap";
import BakerCard from "./BakerCard";
import { db } from "../../config/firebase";
import styles from "./BakersPage.module.css";

export default function BakersPage() {
	const [loading, setLoading] = useState(true);
	const [showDefault, setShowDefault] = useState(true);
	const [storeIDArr, setStoreIDArr] = useState([]);
	const [searchWord, setSearchWord] = useState("");
	const [prevSearchWord, setPrevSearchWord] = useState("");
	const [searchedStoreIDArr, setSearchedStoreIDArr] = useState([]);

	// Clears searchedStoreID array whenever user types in the search bar
	// Goes back to the default results display showing all bakers when user edits the search
	function handleChange(event) {
		setSearchWord(event.target.value);
		setShowDefault(true);
		setSearchedStoreIDArr([]);
	}

	function handleSearch() {
		if (searchWord == "") {
			setShowDefault(true);
		} else if (!showDefault && prevSearchWord === searchWord) {
			return;
		} else {
			db.collection("stores")
				.where("storeName", ">=", searchWord)
				.where("storeName", "<=", searchWord + "\uf8ff")
				.get()
				.then((querySnapshot) => querySnapshot.forEach((doc) => searchedStoreIDArr.push(doc.id)))
				.then(() => setSearchedStoreIDArr(searchedStoreIDArr))
				.then(() => setPrevSearchWord(searchWord))
				.then(() => setShowDefault(false));
		}
	}

	useEffect(() => {
		db.collection("stores")
			.where("storeName", "!=", false)
			.get()
			.then((querySnapshot) => querySnapshot.forEach((doc) => storeIDArr.push(doc.id)))
			.then(() => setStoreIDArr(storeIDArr))
			.then(() => setLoading(false));
		return () => {
			setStoreIDArr([]);
		};
	}, []);

	return (
		!loading && (
			<div>
				<Form.Group as={Col} md="6" className={styles.searchBar}>
					<Form.Label className="d-flex align-items-left">search bakers</Form.Label>
					<InputGroup>
						<Form.Control type="text" onChange={handleChange} placeholder="enter store name" />
						<Button onClick={handleSearch}>Search</Button>
					</InputGroup>
				</Form.Group>
				{showDefault && storeIDArr.map((storeID) => <BakerCard storeID={storeID} key={storeID} />)}
				{!showDefault &&
					searchedStoreIDArr.map((storeID) => (
						<BakerCard storeID={storeID} key={storeID + "_searched"} />
					))}
			</div>
		)
	);
}
