import React, { useState, useEffect } from "react";
import { Card, Image, Button, ListGroup, Col, Row, Modal } from "react-bootstrap";
import styles from "./UserOrderCard.module.css";
import { useHistory } from "react-router-dom";

export default function UserOrderCard(props) {
	const { modeOfTransfer = "defaultModeOfTransfer",
			bakeName = "defaultBakeName",
			bakeSet = "defaultBakeSet",
			qty = 1,
			unitprice = 0,
			remarks = "defaultRemarks",
			bakePhotoURL = "https://cdn.pixabay.com/photo/2016/10/12/22/40/bar-1736191_1280.jpg" } = props

	function handleClick() {
		alert('ive been clicked');
		// history.push(`/bakerProfile/${props.storeID}`);
	}

	return (
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
				<Col>
					<Card className={styles.orderCard}>
						<Card.Header as="h6" onClick={handleClick}>{bakeName}</Card.Header>
						<Card.Body className={styles.orderDesc}>
							<Row>
								<Col xs="auto" className="me-auto">
									<Card.Text className={styles.priceQtyAndMode}>
										<h6>{qty} x ["{bakeSet}"]</h6>
										{modeOfTransfer}<br/>
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
	// (1) 3x (Bag of 4 cookies) of (Chocolate Hazelnut Cookies) at  $4 each - [collection] 
	// (2) 2x (Box of 20 cookies) of (Chocolate Hazelnut Cookies) at $17 each - [collection]
	// (3) 1x (20'' Whole Cake) of (Strawberry Cake) at $40 each - [delivery]"