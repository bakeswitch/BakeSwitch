import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import BuyerOrders from "./BuyerOrders";

export default function OrdersView() {
	const { currentUser } = useAuth();
	const uid = currentUser.uid;
	const [loading, setLoading] = useState(true);
	const [currConfOrdersArr, setCurrConfOrdersArr] = useState([]);

	useEffect(() => {
		db.collection("orders")
			.where("userID", "==", uid)
			.where("isApproved", "==", 1)
			.get()
			.then((querySnapshot) =>
				querySnapshot.forEach((doc) => currConfOrdersArr.push({ id: doc.id, orderRec: doc.data() }))
			)
			.then(() => setCurrConfOrdersArr(currConfOrdersArr))
			.then(() => setLoading(false));
	}, []);

	return !loading && <BuyerOrders title="Confirmed Orders" orderArr={currConfOrdersArr} />;
}
