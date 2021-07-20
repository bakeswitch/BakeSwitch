import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";

function UserOrderPerStore(props) {
    const [userOrderData, setUserOrderData] = useState();
    const { storeID } = props;
    const userOrderRef = db.collection("users").doc(userID).collection("user-orders").doc(storeID);


}

export default function UserOrders() {
	// const [orderedPriceAndQtyArr, setOrderedPriceAndQtyArr] = useState([["default_price","default_qty"]]);
	const [isLoading, setIsLoading] = useState(false);
    const [storeIDArr, setStoreIDArr] = useState([]);
    const currentUser = useAuth();
    const uid = currentUser.uid;

    useEffect(() => {
        try {
			setIsLoading(true);
            fillStoreIDArr("Wq33g2sv1Qbkj3RvxARGS419oNC2"); //HARDCODING FOR TESTING - CHANGE LTR
			// fillStoreIDArr(uid); //arr of orders from different stores (doc name is storeID)
		} finally {
			setIsLoading(false);
		}
		return (() => {
            	setStoreIDArr([]);;
        })
    },[]);
        
    function fillStoreIDArr(userID) {

        const userOrdersRef = db.collection("users").doc(userID).collection("user-orders");
        userOrdersRef.get()    
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    alert("run inside foreach")
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

    return ( !isLoading && 
        <>
            <Card>
                storeID: {JSON.stringify(storeIDArr)}
            </Card>
        </>
    )
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