import React, { useState, useEffect } from "react";
import { Card, Image, Button, ListGroup, Col, Row, Modal } from "react-bootstrap";
import styles from "./UserOrderCard.module.css";
// import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import { CloseButton } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { delOrderFromUserOrders, delUserOrderDoc } from "../../helperFunctions/handleDataFunctions";

export default function UserOrderCard(props) {
	const {
		storeID = "defaultStoreID",
		uid = "defaultUID",
		bakeID = "defaultBakeID",
		storeName = "defaultStoreName",
		modeOfTransfer = "defaultModeOfTransfer",
		bakeName = "defaultBakeName",
		bakeSet = "defaultBakeSet",
		qty = 1,
		unitPrice = 0,
		remarks = "defaultRemarks",
		bakePhotoURL = "https://cdn.pixabay.com/photo/2016/10/12/22/40/bar-1736191_1280.jpg",
		numOfStoreOrders = "defaultNumOfOrdersInStore",
		setNumOfStoreOrders = "defaultSetFunction",
	} = props;
	const history = useHistory();

	const displayModeOfTransfer = (modeOfTransfer) =>
		modeOfTransfer == "collection" ? "-Collection-" : "-Delivery-";

	function handleBakeClick() {
		history.push(`bake-product/${bakeID}`);
	}

	function handleDelete() {
		setNumOfStoreOrders((prvNum) => prvNum - 1);
		// alert("numOfStoreOrders: " + numOfStoreOrders);
		const userOrdersRef = db
			.collection("users")
			.doc(uid) //samyipsh@gmail.com acct
			.collection("user-orders")
			.doc(storeID); //modify name (storeID)
		if (numOfStoreOrders == 1) {
			// alert('delete store');
			delUserOrderDoc(userOrdersRef);
		} else if (numOfStoreOrders > 1) {
			delOrderFromUserOrders(
				userOrdersRef,
				storeName,
				qty,
				bakeSet,
				bakeName,
				unitPrice,
				modeOfTransfer,
				remarks,
				bakePhotoURL,
				bakeID
			);
		}
	}

	return (
		<ListGroup.Item>
			<Row>
				<Col xs="auto">
					<Image variant="left" src={bakePhotoURL} alt="Bake picture" className={styles.bakeImg} />
				</Col>
				<Col className={styles.colWithCard}>
					<Card className={styles.orderCard}>
						<Card.Header as="h6" onClick={handleBakeClick}>
							{bakeName}
						</Card.Header>
						<Card.Body className={styles.orderDesc}>
							<Row>
								<Col xs="auto" className="me-auto">
									<Card.Text className={styles.priceQtyAndMode}>
										<h6>
											{qty} x ["{bakeSet}"]
										</h6>
										{displayModeOfTransfer(modeOfTransfer)}
										<br />
									</Card.Text>
								</Col>
								<Col className={styles.remarks}>{remarks}</Col>
								<Col className="ms-auto" as="h6" xs={2}>
									${unitPrice}
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
				<Col xs="auto">
					<AiOutlineCloseCircle onClick={handleDelete} />
				</Col>
			</Row>
		</ListGroup.Item>
	);
}

// function ModalPopUp(props) {
// 	const { headerText = "defaultHeader",
// 			bodyText = "defaultBody",
// 			handleClose = () => alert("defaultHandleClose"),
// 			handleShow = () => alert("defaultHandleShow"),
// 			show = false } = props;

// 	return (
// 	  <>
// 		<Modal show={show} onHide={handleClose}>
// 			<Modal.Header closeButton>
// 				<Modal.Title>{headerText}</Modal.Title>
// 			</Modal.Header>
// 			<Modal.Body style={{fontSize:"small"}}>
// 				{`why doesnt \n
// 				new lines show`}
// 				{/* {bodyText} */}
// 			</Modal.Body>
// 			<Modal.Footer>
// 				<Button variant="secondary" onClick={handleClose}>
// 					Close
// 				</Button>
// 				<Button variant="primary" onClick={handleClose}>
// 					Copy Order Text
// 				</Button>
// 			</Modal.Footer>
// 		</Modal>
// 	  </>
// 	);
//   }
