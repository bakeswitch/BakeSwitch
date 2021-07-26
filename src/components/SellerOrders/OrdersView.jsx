import React, { useEffect, useState } from "react";
import OrdersDisplay from "./OrdersDisplay";
import { db } from "../../config/firebase";
import { Button } from "react-bootstrap";

export default function OrdersView(props) {
	const storeID = props.storeID;

	const [loading, setLoading] = useState(true);
	const [collectOrdersArr, setCollectOrdersArr] = useState([]);
	const [deliveryOrdersArr, setDeliveryOrdersArr] = useState([]);
	const [allOrdersArr, setAllOrdersArr] = useState([]);
	const [showAll, setShowAll] = useState(false);
	const [showAllLoading, setShowAllLoading] = useState(true);

	useEffect(() => {
		// Date as string in YYYY/MM/DD format
		const today = new Date().toLocaleDateString("en-ZA");

		db.collection("orders")
			.where("storeID", "==", storeID)
			.where("transacDate", ">=", today)
			.get()
			.then((querySnapshot) =>
				querySnapshot.forEach(async (doc) => {
					const mode = await doc.data().modeOfTransfer;
					if (mode == "collection") {
						collectOrdersArr.push({ id: doc.id, orderRec: doc.data() });
					} else {
						deliveryOrdersArr.push({ id: doc.id, orderRec: doc.data() });
					}
				})
			)
			.then(() => {
				setCollectOrdersArr(collectOrdersArr);
				setDeliveryOrdersArr(deliveryOrdersArr);
			})
			.then(() => setLoading(false));
		return () => {
			setCollectOrdersArr([]);
			setDeliveryOrdersArr([]);
		};
	}, []);

	useEffect(() => {
		db.collection("orders")
			.where("storeID", "==", storeID)
			.orderBy("transacDate")
			.get()
			.then((querySnapshot) =>
				querySnapshot.forEach((doc) => allOrdersArr.push({ id: doc.id, orderRec: doc.data() }))
			)
			.then(() => setAllOrdersArr(allOrdersArr))
			.then(() => setShowAllLoading(false));
		return () => {
			setAllOrdersArr([]);
		};
	}, []);

	return (
		!loading && (
			<>
				{collectOrdersArr.length != 0 && (
					<OrdersDisplay title="Collection Orders" orderArr={collectOrdersArr} />
				)}
				{deliveryOrdersArr.length != 0 && (
					<OrdersDisplay title="Delivery Orders" orderArr={deliveryOrdersArr} />
				)}
				<Button variant="secondary" className="mt-2 mb-2" onClick={() => setShowAll(!showAll)}>
					View All Orders
				</Button>
				{showAll && !showAllLoading && <OrdersDisplay title="All Orders" orderArr={allOrdersArr} />}
			</>
		)
	);
}
