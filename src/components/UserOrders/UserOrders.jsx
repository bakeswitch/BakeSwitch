import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import UserStoreOrders from "../UserOrderCard/UserStoreOrders.jsx";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import styles from "./UserOrders.module.css";
import { useHistory } from "react-router-dom";

//populates storeIDArr
export default function UserOrders() {
	// const [orderedPriceAndQtyArr, setOrderedPriceAndQtyArr] = useState([["default_price","default_qty"]]);
	const [isLoading, setIsLoading] = useState(false);
	const [storeIDArr, setStoreIDArr] = useState([]);
	const { currentUser } = useAuth();
	const uid = currentUser.uid;
	const history = useHistory();

	useEffect(() => {
		try {
			setIsLoading(true);
			// alert(uid);
			fillStoreIDArr(uid); //HARDCODING FOR TESTING - CHANGE LTR
			// fillStoreIDArr(uid); //arr of orders from different stores (doc name is storeID)
		} finally {
			setIsLoading(false);
		}
		return () => {
			setStoreIDArr([]);
		};
	}, []);

	//for each user, take out all stores which he has ordered from & populate array to reference later
	function fillStoreIDArr(userID) {
		const userOrdersRef = db.collection("users").doc(userID).collection("user-orders");
		userOrdersRef
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					// alert("run inside foreach")
					setStoreIDArr((prevArr) => {
						return [...prevArr, doc.id];
					});
				});
			})
			.catch((error) => {
				alert("Error reading orders from user-order: " + error);
			})
			.finally(() => setIsLoading(false));
	}

	return (
		!isLoading && (
			<>
				{/* storeID: {JSON.stringify(storeIDArr)} */}
				{storeIDArr.length != 0 ? (
					storeIDArr.map((storeID) => (
						<UserStoreOrders userID={uid} storeID={storeID} key={storeID} />
					))
				) : (
					<CallToOrder />
				)}
			</>
		)
	);
}

function CallToOrder() {
	const history = useHistory();

	return (
		<Card border="dark" className={styles.callToOrderCard}>
			<Card.Img
				variant="top"
				src="https://cdn.pixabay.com/photo/2016/02/19/10/13/pug-1209129_1280.jpg"
			/>
			<Card.Body>
				<Card.Title>No orders?</Card.Title>
				<Card.Text as="h6">Quickk!! Add some orders before mumbo goes hungry</Card.Text>
				<Button
					variant="secondary"
					onClick={() => {
						history.push("/bakes");
					}}
				>
					Browse Bakes
				</Button>
			</Card.Body>
		</Card>
	);
}
