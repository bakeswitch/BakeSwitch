import { db } from "../config/firebase";
import firebase from "@firebase/app";


//PARAM: bakeData
//RETURNS: array of arrays [price, qty], which is sorted by price in ascending order
export function orderPriceAndQtyArr(bakeData) {
	if (bakeData != null) {
		const { bakePriceAndQty: unorderedPnQ } = bakeData;
		const unorderedKeys = Object.keys(unorderedPnQ);
		const orderedPnQArr = unorderedKeys
			.sort((a, b) => a - b) 			//sort keys in ascending order [1,2,3]
			.map(price => [price, unorderedPnQ[price]]); //place them in nested array [[p1,q1], [p2,q2], ...]
		return orderedPnQArr;
	} else {
		return alert("bakeData is empty, price and qty cannot be ordered");
	}
}
//PARAM: userOrderData
//RETURNS: string of orderText for user to copy and send via preferred contact channel of seller
export function generateOrder(userOrderData) {
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

export function writeOrderToUserOrders(userOrdersRef, storeName, qty, bakeSet, bakeName, unitPrice, modeOfTransfer, remarks, bakePhotoURL) {
	const orderObj = {	modeOfTransfer: modeOfTransfer, 
						bakeName: bakeName, 
						bakeSet: bakeSet, 
						qty: qty, 
						unitprice: unitPrice, 
						remarks: remarks,
						bakePhotoURL: bakePhotoURL };
	userOrdersRef.set({
		storeName: storeName,
		orderObj: firebase.firestore.FieldValue.arrayUnion(orderObj)
	}, {merge: true})
	.then(() => alert('added order'))
	.catch((err) => alert("unable to set userOrder: " + err));
}
export function delOrderFromUserOrders(userOrdersRef, storeName, qty, bakeSet, bakeName, unitPrice, modeOfTransfer, remarks, bakePhotoURL) {
	const orderObj = {	modeOfTransfer: modeOfTransfer, 
						bakeName: bakeName, 
						bakeSet: bakeSet, 
						qty: qty, 
						unitprice: unitPrice, 
						remarks: remarks,
						bakePhotoURL: bakePhotoURL };
	userOrdersRef.set({
		storeName: storeName,
		orderObj: firebase.firestore.FieldValue.arrayRemove(orderObj)
	}, {merge: true})
	// .then(() => alert('Order has been deleted'))
	.catch((err) => alert("unable to del userOrder: " + err));
}
export function delUserOrderDoc(userOrdersRef) {
	userOrdersRef.delete()
		.then(() => alert("Your orders for this store have all been deleted"))
		.catch((err) => alert("unable to del user order doc: " + err))
		.finally(() => {
			setTimeout(() => window.location.reload(), 6000); //setting time so that firestore can delete the doc
		});
}

//PARAM: orderObjArr from the userOrderData field (db.collection("users").doc(userID).collection("user-orders").doc(storeID))
//RETURNS: total cost of orders to a particular store
export function getTotalCost(orderObjArr) {
	const reducer = (accumulatedCost, orderObj) => {
		const orderCost = orderObj.unitprice * orderObj.qty;
		return orderCost + accumulatedCost;
	};
	const totalCost = orderObjArr.reduce(reducer, 0);
	return totalCost;
}

/*
const orderGenerated = 
`${qty}x ` +
`(${bakeName}) ` + 
`at $${orderedPnQArr[indexPair][0]} each - ` +
`[${modeOfTransfer}]`;
*/