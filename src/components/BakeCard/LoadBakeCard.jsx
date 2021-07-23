import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BakeCard from ".";
import { orderPriceAndQtyArr } from "../../helperFunctions/handleDataFunctions";
import { db } from "../../config/firebase";
import ErrorCard from "../helperComponents/ErrorCard";

export function LoadBakeCard(props) {
	const bakeID = props.bakeID;
	// alert('runs here in dbc');
	const [bakeData, setBakeData] = useState();
	const [orderedPriceAndQtyArr, setOrderedPriceAndQtyArr] = useState([
		["default_price", "default_qty"],
	]);
	const [isLoading, setIsLoading] = useState(false);

	if (bakeID == "") {
		return "Don't load";
	}

	const bakeRef = db.collection("bakes").doc(bakeID);
	const history = useHistory();

	function fillBakeData() {
		bakeRef
			.get()
			.then((snapshot) => {
				if (snapshot && snapshot.exists) {
					setBakeData(snapshot.data());
					// alert("bakeData set");
				} else {
					alert("snapshot doesnt exist");
				}
			})
			.catch((err) => alert("setBakeObj error: " + err));
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
		});
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
	}, []);

	if (!bakeData) {
		return ErrorCard("no bake data");
	}

	//pass in default values in case can't read fields
	const {
		bakeName = "default_bake_name",
		storeID = "default_store_id",
		bakeDesc = "default_bake_desc",
		bakePhotoURL = "default_bake_photo",
		storeName = 'default_store_name'
	} = bakeData;


	return (
		!isLoading && (
			<BakeCard
				key={"displayBakeCard_" + bakeID}
				bakeID={bakeID}
				// handleOnClick={handleOnClick}
				bakePhotoURL={bakePhotoURL}
				bakeName={bakeName}
				bakeDesc={bakeDesc}
				orderedPriceAndQtyArr={orderedPriceAndQtyArr}
				storeID={storeID}
				storeName={storeName}
			/>
		)
	);
}
