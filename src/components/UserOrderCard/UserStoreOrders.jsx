import React, { useState, useEffect } from "react";
import { ListGroup, Col, Row } from "react-bootstrap";
import styles from "./UserOrderCard.module.css";
import { db } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import ErrorCard from "../helperComponents/ErrorCard";
import UserOrderCard from "./UserOrderCard";
import { getTotalCost } from "../../helperFunctions/handleDataFunctions";
import { AiFillWindows } from "react-icons/ai";

export default function UserStoreOrders(props) {
	const { userID, storeID } = props;
	const [userOrderData, setUserOrderData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	// const [orderTextOnModal, setOrderTextOnModal] = useState("");
	const history = useHistory();
	const userOrderRef = db.collection("users").doc(userID).collection("user-orders").doc(storeID);
	const [numOfStoreOrders, setNumOfStoreOrders] = useState();
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		fillUserOrderData();
		getRealTimeUpdates();
	}, []);

	useEffect(
		() => (userOrderData ? setNumOfStoreOrders(userOrderData.orderObj.length) : ""),
		[userOrderData]
	);

	function handleClickStore() {
		history.push(`bakerProfile/${storeID}`);
	}

	function handleClickGenerate() {
		const orderText = generateOrder(userOrderData);
		navigator.clipboard
			.writeText(orderText) //returns promise
			.then(
				() => alert("The following text has been copied to clipboard: \n\n" + orderText),
				() => alert("unable to write text to clipboard: " + err)
			);
		// setOrderTextOnModal(orderText);
		// setShowModal(true);
	}

	function fillUserOrderData() {
		userOrderRef
			.get()
			.then((snapshot) => {
				setIsLoading(true);
				if (snapshot && snapshot.exists) {
					setUserOrderData(snapshot.data());
				}
			})
			.catch((err) => alert("setUserOrderObj error: " + err))
			.finally(() => setIsLoading(false));
	}

	function getRealTimeUpdates() {
		userOrderRef.onSnapshot((snapshot) => {
			setUserOrderData(snapshot.data());
			//removed snapshot.exist conditional test so that can set it to null
			/*
				if (snapshot && snapshot.exists) {
				} else {
					alert("snapshot doesnt exist for realtime update");
				} */
		});
	}

	if (!userOrderData) {
		return null;
		// ErrorCard("no user order data");
	}

	const {
		storeName = "defaultStoreName",
		totalCost = "defaultTotalCost",
		orderObj: orderObjArr = [{}],
	} = userOrderData;

	return (
		!isLoading && (
			<>
				{/* <ModalPopUp 
					headerText = "Order Text" 
					bodyText = {orderTextOnModal}
					handleClose = {() => setShowModal(false)}
					handleShow = {() => setShowModal(true)}
					show = {showModal}
				/> */}
				<ListGroup variant="flush" className={styles.listGroup}>
					{/* store order header */}
					<ListGroup.Item>
						<Row>
							<Col xs="auto" className="me-auto">
								<span className={styles.storeName} onClick={handleClickStore}>
									{storeName}
								</span>
							</Col>
							{/* <Col>totalCost: ${totalCost}</Col> */}
							<Col className="ms-auto" xs="auto">
								<a className={{ color: "blue" }} onClick={handleClickGenerate}>
									Generate Order Text
								</a>
							</Col>
						</Row>
					</ListGroup.Item>
					{userOrderData.orderObj.map((orderObj, index) => (
						<UserOrderCard
							storeID={storeID}
							uid={userID}
							bakeID={orderObj.bakeID}
							storeName={storeName}
							modeOfTransfer={orderObj.modeOfTransfer}
							bakeName={orderObj.bakeName}
							bakeSet={orderObj.bakeSet}
							qty={orderObj.qty}
							unitPrice={orderObj.unitPrice}
							remarks={orderObj.remarks}
							bakePhotoURL={orderObj.bakePhotoURL}
							numOfStoreOrders={numOfStoreOrders}
							setNumOfStoreOrders={setNumOfStoreOrders}
							key={index}
						/>
					))}
				</ListGroup>
			</>
		)
	);
}

function generateOrder(userOrderData) {
	const { storeName = "defaultStoreName", orderObj: orderObjArr = [{}] } = userOrderData;
	const totalCost = getTotalCost(orderObjArr);

	const greeting = `Hi ${storeName}, may I order the following at a total price of $${totalCost}, please? \n`;
	const ordersText = orderObjArr.map((orderObj, index) => {
		const modeOfTransfer = orderObj.modeOfTransfer;
		const bakeName = orderObj.bakeName;
		const bakeSet = orderObj.bakeSet;
		const qty = orderObj.qty;
		const unitPrice = orderObj.unitPrice;
		return `(${
			index + 1
		}) ${qty}x (${bakeSet}) of (${bakeName}) at $${unitPrice} each - [${modeOfTransfer}] \n`;
	});

	const ordersRemarks = orderObjArr.map((orderObj, index) => {
		const remarks = orderObj.remarks;
		return remarks ? `(${index + 1}) "${remarks}" \n` : "";
	});
	return greeting + ordersText.join("") + `\n` + `Additional Remarks: \n` + ordersRemarks.join("");
}
