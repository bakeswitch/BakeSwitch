import React, { useState, useEffect } from "react";
import { Card, Image, Button, ListGroup, Col, Row, Breadcrumb } from "react-bootstrap";
import styles from "./UserOrderCard.module.css";
import { db } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import ErrorCard from "../helperComponents/ErrorCard";

function UserOrderCard(props) {
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
		// <Card key={"card_" + bakeID} className={styles.card} onClick={handleOnClick}>
		// 	<Card.Img key={"img_" + bakeID}
		// 		className={styles.cardImg}
		// 		variant="top"
		// 		src={bakePhotoURL}
		// 	/>
		// 	<Card.Body key={"body_" + bakeID} className={styles.cardBody}>
		// 		<Card.Title key={"title_" + bakeID} className={styles.max2Lines}>{bakeName}</Card.Title>
		// 		<Card.Text key={"desc_" + bakeID} className={styles.max3Lines}>
		// 				{bakeDesc}
		// 		</Card.Text>
		// 		<Card.Text key={"footer_" + bakeID} className={styles.cardFooter}>
		// 			from S${orderedPriceAndQtyArr[0][0]} dollars onwards
		// 			<br />
		// 			by <Card.Link key={"store_" + bakeID}>{storeID}</Card.Link>
		// 		</Card.Text>
		// 	</Card.Body>
		// </Card>
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
								<Col className="ms-auto" as="h3" xs={2}>
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


export function LoadUserStoreOrders(props) {
	const { userID, storeID } = props;
	const [userOrderData, setUserOrderData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();
	const userOrderRef = db.collection("users").doc(userID)
							.collection("user-orders").doc(storeID);
	
	// if userOrderRef has no doc?
	useEffect(
		() => fillUserOrderData(),
		[]
	);
	
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
			<ListGroup variant="flush" className={styles.listGroup}>
				{/* store order header */}
				<ListGroup.Item>
					<Row>
						<Col xs="auto" className="me-auto"> 
							<span className={styles.storeName}>{storeName}</span> 
						</Col>
						{/* <Col>totalCost: ${totalCost}</Col> */}
						<Col className="ms-auto" xs="auto">
							<a className={{color: "blue"}} onClick={() => alert("throw modal")}>
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
		)
	);
}

/*
export function DisplayBakeCard(props) {
	const bakeID = props.bakeID;
	const [bakeData, setBakeData] = useState();
	const [orderedPriceAndQtyArr, setOrderedPriceAndQtyArr] = useState([["default_price","default_qty"]]);
	const [isLoading, setIsLoading] = useState(false);

	if (bakeID == "") {
		return "Don't load";
	}

	const bakeRef = db.collection("bakes").doc(bakeID);
	const history = useHistory();

	
	function fillBakeData() {
		bakeRef.get()
			.then((snapshot) => {
				if (snapshot && snapshot.exists) {
					setBakeData(snapshot.data());
					// alert("bakeData set");
				} else {
					alert('snapshot doesnt exist');
				}
			}).catch((err) => alert("setBakeObj error: " + err));
	}

	function getRealTimeUpdates() {
		bakeRef.onSnapshot((snapshot) => {
			if (snapshot && snapshot.exists) {
				// alert(JSON.stringify(snapshot.data())); //runs here
				const orderedPnQArr = orderPriceAndQtyArr(snapshot.data());
				// alert(JSON.stringify(orderedPnQ)); //Doesnt run here
				setOrderedPriceAndQtyArr(orderedPnQArr);
			} else {
				alert("snapshot doesnt exist for realtime update");
			}
		})
	}
	
	useEffect(() => {
		try {
			setIsLoading(true);
			fillBakeData();
			getRealTimeUpdates();
		} finally {
			setIsLoading(false);
		}
		// return (() => {
		// 	setBakeData([]);
		// 	setIsLoading(false);
		// })
	},[]);
	
	if (!bakeData) { 
		return ErrorCard("no bake data") 
	}
	
	//pass in default values in case can't read fields
	const { bakeName 		= 'default_bake_name', 
			storeID  		= 'default_store_id',
			bakeDesc 		= 'default_bake_desc',
			bakePhotoURL 	= 'default_bake_photo' } = bakeData;
	
	function handleOnClick() {
		history.push(`/bake-product/${bakeID}`);
	}
	
	return !isLoading && ( 
		<BakeCard 
			key = {"displayBakeCard_" + bakeID}
			bakeID = {bakeID}
			handleOnClick = {handleOnClick}
			bakePhotoURL = {bakePhotoURL}
			bakeName = {bakeName}
			bakeDesc = {bakeDesc}
			orderedPriceAndQtyArr = {orderedPriceAndQtyArr}
			storeID = {storeID}
		/>
	);
}
*/