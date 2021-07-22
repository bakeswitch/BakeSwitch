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
	const { storeID = 'defaultStoreID',
			uid = 'defaultUID',
			storeName = 'defaultStoreName',
			modeOfTransfer = "defaultModeOfTransfer",
			bakeName = "defaultBakeName",
			bakeSet = "defaultBakeSet",
			qty = 1,
			unitprice = 0,
			remarks = "defaultRemarks",
			bakePhotoURL = "https://cdn.pixabay.com/photo/2016/10/12/22/40/bar-1736191_1280.jpg",
			numOfStoreOrders = "defaultNumOfOrdersInStore",
			setNumOfStoreOrders = 'defaultSetFunction',
			setShowStoreOrders = 'defaultSetShowStoreOrders'} = props;

	const [showCard, setShowCard] = useState(true);
	

	const displayModeOfTransfer = (modeOfTransfer) =>
		 modeOfTransfer == "collection" ? "-Collection-" : "-Delivery-";

	function handleClick() {
		alert('ive been clicked');
		// history.push(`/bakerProfile/${props.storeID}`);
	}

	function handleDelete() {
		setShowCard(false);
		setNumOfStoreOrders(prvNum => prvNum - 1);
		
		alert("numOfStoreOrders: " + numOfStoreOrders);
        const userOrdersRef = db
		.collection("users").doc(uid) //samyipsh@gmail.com acct
		.collection("user-orders").doc(storeID); //modify name (storeID)
		if (numOfStoreOrders == 1) {
			delUserOrderDoc(userOrdersRef);
			setShowStoreOrders(false);
			alert('delete store');
		} else if (numOfStoreOrders > 1) {
			return delOrderFromUserOrders(userOrdersRef, storeName, qty, bakeSet, bakeName, unitprice, modeOfTransfer, remarks, bakePhotoURL)
		}
		// window.location.reload();
		// alert('should have reloaded')
	}



	return (
		showCard &&  
		<ListGroup.Item>
			<Row>
				<Col xs="auto">
					<Image
						variant = "left"
						src= {bakePhotoURL}
						alt="Bake picture"
						// roundedCircle
						className={styles.bakeImg}
					/>
				</Col>
				<Col className={styles.colWithCard}>
					<Card className={styles.orderCard}>
						<Card.Header as="h6" onClick={handleClick}>
							{bakeName}  
						</Card.Header>
						<Card.Body className={styles.orderDesc}>
							<Row>
								<Col xs="auto" className="me-auto">
									<Card.Text className={styles.priceQtyAndMode}>
										<h6>{qty} x ["{bakeSet}"]</h6>
										{displayModeOfTransfer(modeOfTransfer)}<br/>
									</Card.Text>
								</Col>
								<Col className={styles.remarks}>
								 	{remarks} 
								</Col>
								<Col className="ms-auto" as="h6" xs={2}>
									${unitprice}
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
  