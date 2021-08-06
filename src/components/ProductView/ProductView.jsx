import React, { useState, useEffect } from "react";
import styles from "./ProductView.module.css";
import {
	FormControl,
	Badge,
	InputGroup,
	ButtonGroup,
	ToggleButton,
	Card,
	Nav,
	Row,
	Col,
	Button,
	Dropdown,
	DropdownButton,
} from "react-bootstrap";
import ProductNavPages from "./ProductNavPages";
import { FaHeart, FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import {
	orderPriceAndQtyArr,
	writeOrderToUserOrders,
} from "../../helperFunctions/handleDataFunctions";
import ErrorCard from "../helperComponents/ErrorCard";
import { RatingDetails } from "../helperComponents/RatingOutOf5.jsx";

function isLoggedIn(uid) {
	return uid != "";
}

export default function ProductView(props) {
	const bakeID = props.bakeID;
	const bakeRef = db.collection("bakes").doc(bakeID);
	const [isLoading, setIsLoading] = useState(false);
	const [bakeData, setBakeData] = useState();
	const [storeData, setStoreData] = useState();
	const [indexPair, setIndexPair] = useState(0);
	const [radioValue, setRadioValue] = useState("1");
	const [isLiked, setIsLiked] = useState(false); //Link to wishlist
	const [qty, setQty] = useState(1); //for qty of item group
	const { currentUser } = useAuth();
	const uid = currentUser ? currentUser.uid : "";

	function fillBakeData() {
		//set bakedoc
		bakeRef
			.get()
			.then((snapshot) => {
				setIsLoading(true);
				if (snapshot && snapshot.exists) {
					setBakeData(snapshot.data());
					// alert("bakeData set");
				} else {
					return alert("bakeID invalid? unable to load doc");
				}
			})
			.catch((err) => alert("unable to set bake data, err :" + err))
			.finally(() => setIsLoading(false));
	}

	function fillStoreData(bakeData) {
		const storeID = bakeData.storeID;
		const storeRef = db.collection("stores").doc(storeID);
		storeRef
			.get()
			.then((snapshot) => {
				setIsLoading(true);
				if (snapshot && snapshot.exists) {
					setStoreData(snapshot.data());
					// alert("storeData set" + JSON.stringify(snapshot.data()));
				} else {
					alert("storeID invalid? unable to load doc");
				}
			})
			.catch((err) => alert("unable to set store data" + err))
			.finally(() => setIsLoading(false));
	}

	function getRealTimeUpdates() {
		bakeRef.onSnapshot((snapshot) => {
			setIsLoading(true);
			if (snapshot && snapshot.exists) {
				fillStoreData(snapshot.data());
			} else {
				alert("snapshot doesnt exist for realtime update");
			}
			setIsLoading(false);
		});
	}

	function addOrderToCart(uid) {
		if (!isLoggedIn(uid)) {
			return alert("Please log in to add to My Orders");
		}

		if (!isAvailable) {
			if (!confirm("Are you sure you want to add order? Item is currently not available")) {
				return;
			}
		}
		const storeID = bakeData.storeID;
		const bakeSet = orderedPnQArr[indexPair][1];
		const unitPrice = orderedPnQArr[indexPair][0];
		const remarks = prompt(
			"Enter any remarks for your order (please include dates for delivery/collection, location, and other specifications"
		);
		const userOrdersRef = db
			.collection("users")
			.doc(uid) //samyipsh@gmail.com acct
			.collection("user-orders")
			.doc(storeID); //modify name (storeID)
		return writeOrderToUserOrders(
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

	useEffect(() => {
		fillBakeData();
		getRealTimeUpdates();
	}, []);

	if (!bakeData || !storeData) {
		return ErrorCard("no bake data or store data loaded yet");
	}

	const {
		bakePhotoURL = "default_bake_photo_url",
		bakeName = "default_bake_name",
		// bakeDesc 		= 'default_bake_desc',
		isAvailable = "default_is_available",
		storeName = "default_store_name",
		numOfRatings = 0,
		numOfStars = 0,
	} = bakeData;
	const { deliveryBool = true, selfCollectionBool = true } = storeData;
	const orderedPnQArr = orderPriceAndQtyArr(bakeData);

	const modeOfTransfer = radioValue === "1" ? `collection` : `delivery`;

	// const orderGenerated =
	//     `${qty}x ` +
	//     `(${bakeName}) ` +
	//     `at $${orderedPnQArr[indexPair][0]} each - ` +
	//     `[${modeOfTransfer}]`;

	return (
		!isLoading && (
			<>
				<Row className={styles.row}>
					<Col xs={12} md={6} className="p-4">
						<Card border="light">
							{/* make carousel here? */}
							<Card.Img src={bakePhotoURL} rounded="true" fluid="true" />
						</Card>
					</Col>
					<Col xs={12} md={6} className="p-4">
						<h3 className="mb-0">
							{bakeName}
							{!isAvailable && <span className="badge pill bg-danger ms-3">Not available</span>}
						</h3>

						<div className="mb-3">
							<RatingDetails numOfRatings={numOfRatings} numOfStars={numOfStars} />
						</div>
						<dl className="row sm mb-3">
							{/* <dt className="col-sm-4">Is Available</dt>
							<dd className="col-sm-8 p-0" style={{ color: isAvailable ? "black" : "red" }}>
								{isAvailable ? "Av" : "false"}
							</dd> */}
							<dt className="col-sm-4">Sold by</dt>
							<dd className="col-sm-8 p-0">{storeName}</dd>
							<dt className="col-sm-4">Obtain by</dt>
							<dd className="col-sm-8 p-0">
								<ButtonGroup className="mb-2">
									<ToggleButton
										className="p-0 me-4"
										key="collection"
										id="radio-collection"
										type="radio"
										variant="white"
										name="radio"
										value="1"
										checked={radioValue === "1"}
										onChange={(e) => setRadioValue(e.currentTarget.value)}
										disabled={!selfCollectionBool}
									>
										Self-Collection
									</ToggleButton>
									<ToggleButton
										className="p-0 me-4"
										key="delivery"
										id="radio-delivery"
										type="radio"
										variant="white"
										name="radio"
										value="2"
										checked={radioValue === "2"}
										onChange={(e) => setRadioValue(e.currentTarget.value)}
										disabled={!deliveryBool}
									>
										Delivery
									</ToggleButton>
								</ButtonGroup>
							</dd>
							<label htmlFor="qty-select">Choose set:</label>
							<select
								onChange={(e) => setIndexPair(e.target.value)}
								id="qty-select"
								className="ms-2"
								style={{ maxWidth: "24rem" }}
							>
								{orderedPnQArr.map((pnqPair, index) => (
									<option value={index} key={index} readOnly>
										{pnqPair[1]}
									</option>
								))}
							</select>
						</dl>
						<h3 className="font-weight-bold me-2 mt-3">${orderedPnQArr[indexPair][0]}</h3>

						<Row>
							<Col sm={6} variant="dark">
								<InputGroup>
									<FaMinusSquare
										size={40}
										onClick={() => {
											if (qty - 1 <= 0) {
												return alert("Unable to order 0 or fewer number of items");
											}
											return setQty((prevQty) => prevQty - 1);
										}}
									/>
									<FormControl value={qty} className="d-inline bg-light" readOnly />
									<FaPlusSquare
										size={40}
										onClick={() => {
											if (qty + 1 > 100) {
												return alert(
													"For orders of more than 100 items, kindly contact the seller directly"
												);
											}
											return setQty((prevQty) => prevQty + 1);
										}}
									/>
								</InputGroup>
							</Col>
							<Col sm={12}>
								<ButtonGroup>
									<Button
										className={styles.noFocusButton}
										variant={isAvailable ? "success" : "danger"}
										title="Add to cart"
										onClick={() => addOrderToCart(uid)}
									>
										<FiSend /> Add to My Orders
									</Button>
									<Button
										className={styles.noFocusButton}
										variant="outline-secondary"
										title="Add to wishlist"
										onClick={() => setIsLiked((prvBool) => !prvBool)}
										hidden
									>
										<FaHeart color={isLiked ? "red" : "black"} />
									</Button>
								</ButtonGroup>
							</Col>
						</Row>
					</Col>
				</Row>
				{/* <Row>{orderGenerated}</Row> */}
				<ProductNavPages bakeData={bakeData} storeData={storeData} orderedPnQArr={orderedPnQArr} />
			</>
		)
	);
}

//use  Bootstrap Modal for popup
//   <FloatingLabel controlId="floatingTextarea2" label="Comments">
// <Form.Control
// as="textarea"
// placeholder="Leave a comment here"
// style={{ height: '100px' }}
// />
// </FloatingLabel>
