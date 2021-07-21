import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { LoadUserStoreOrders } from "../UserOrderCard/UserOrderCard.jsx";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";


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
        
    //for each user, take out all stores which he has ordered from & populate array to reference later
    function fillStoreIDArr(userID) {
        const userOrdersRef = db.collection("users").doc(userID).collection("user-orders");
        userOrdersRef.get()    
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

    return ( !isLoading && 
        <>
			{/* storeID: {JSON.stringify(storeIDArr)} */}
            {storeIDArr.map(storeID => 
                <LoadUserStoreOrders
                    userID = "Wq33g2sv1Qbkj3RvxARGS419oNC2"
                    storeID = {storeID}
			    />
            )}
        </>
    )
}

