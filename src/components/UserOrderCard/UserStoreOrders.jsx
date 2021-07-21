import React, { useState, useEffect } from "react";
import { ListGroup, Col, Row } from "react-bootstrap";
import styles from "./UserOrderCard.module.css";
import { db } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import ErrorCard from "../helperComponents/ErrorCard";
import UserOrderCard from "./UserOrderCard";

export default function UserStoreOrders(props) {
	const { userID, storeID } = props;
	const [userOrderData, setUserOrderData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	// const [orderTextOnModal, setOrderTextOnModal] = useState("");
	// const history = useHistory();
	const userOrderRef = db.collection("users").doc(userID)
							.collection("user-orders").doc(storeID);
	const [showModal, setShowModal] = useState(false);

	useEffect(
		() => fillUserOrderData(),
		[]
	);

	function handleClickGenerate() {
		const orderText = generateOrder(userOrderData)
		alert("The following text has been copied to clipboard: \n\n" + orderText);
		navigator.clipboard.writeText(orderText);
		// setOrderTextOnModal(orderText);
		// setShowModal(true);
	}
	
	function fillUserOrderData() {
		userOrderRef.get()
			.then((snapshot) => {
				setIsLoading(true);
				if (snapshot && snapshot.exists) {
					setUserOrderData(snapshot.data());
				} else {
					alert('snapshot doesnt exist');
				}
			}).catch(err => alert("setUserOrderObj error: " + err))
			.finally(() => setIsLoading(false));
	}

	if (!userOrderData) {
		return ErrorCard("no user order data");
	}

	const { storeName = "defaultStoreName",
			totalCost = "defaultTotalCost",
			orderObj : orderObjArr  = [{}] 	} = userOrderData;
	
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
								<span className={styles.storeName}>{storeName}</span> 
							</Col>
							{/* <Col>totalCost: ${totalCost}</Col> */}
							<Col className="ms-auto" xs="auto">
								<a className={{color: "blue"}} onClick={handleClickGenerate}>
									Generate Order Text
								</a>
							</Col>
						</Row>
					</ListGroup.Item>
					{orderObjArr.map(orderObj => 
						<UserOrderCard 
							modeOfTransfer = {orderObj.modeOfTransfer == "collection" ? "-Collection-": "-Delivery-"}
							bakeName = {orderObj.bakeName}
							bakeSet = {orderObj.bakeSet}
							qty = {orderObj.qty}
							unitprice = {orderObj.unitprice}
							remarks = {orderObj.remarks}
							bakePhotoURL = {orderObj.bakePhotoURL}
						/>
					)}
				</ListGroup>
			</>
		)
	);
}


function generateOrder(userOrderData) {
	const { storeName = "defaultStoreName",
			totalCost = "defaultTotalCost",
			orderObj : orderObjArr  = [{}] 	} = userOrderData;

	const greeting = `Hi ${storeName}, may I order the following at a total price of $${totalCost}, please? \n`;
	const ordersText =  orderObjArr.map((orderObj, index) => {
		const modeOfTransfer = orderObj.modeOfTransfer;
		const bakeName = orderObj.bakeName;
		const bakeSet = orderObj.bakeSet;
		const qty = orderObj.qty;
		const unitprice = orderObj.unitprice;
		return `(${index + 1}) ${qty}x (${bakeSet}) of (${bakeName}) at $${unitprice} each - [${modeOfTransfer}] \n` 
	});	
	
	const ordersRemarks = orderObjArr.map((orderObj, index) => {
		const remarks = orderObj.remarks;
		return remarks ? `(${index + 1}) "${remarks}" \n` : ""; 
	});
	return greeting + ordersText.join('') + `\n` + `Additional Remarks: \n` + ordersRemarks.join('');
}