import React, { useState } from "react";
import { writeOrderToUserOrders, delOrderFromUserOrders } from "../helperFunctions/handleDataFunctions";
import { db } from "../config/firebase";
import { bakeDocObj_1, bakeDocObj_2, bakeDocObj_3 } from "./test-bakes";
import { storeDocObj_1, storeDocObj_2, storeDocObj_3 } from "./test-stores";
import { userDocObj_1, userOrderDocObj_1, userOrderDocObj_2 } from "./test-users";

export function setupBakeDoc() {
	//modify object and name before pressing button
	const bakeRef = db.collection("bakes").doc("bake_0003"); 	//modify name
	const bakeDocObj = bakeDocObj_3; 							//modify obj
	bakeRef
		.set(bakeDocObj)
		.then(() => alert("bake successfully written to db"))
		.catch(() => alert("error writing to db"));
}

export function setupStoreDoc() {
	//modify object and name before pressing button
	const storeRef = db.collection("stores").doc("store_0003"); //modify name
	const storeDocObj = storeDocObj_3;							//modify obj
	storeRef
		.set(storeDocObj)
		.then(() => alert("store successfully written to db"))
		.catch(() => alert("error writing to db"));
}

export function setupUserDoc() {
	//modify object and name before pressing button
	const userRef = db.collection("users").doc("Wq33g2sv1Qbkj3RvxARGS419oNC2"); //bakeswitch user
	const userDocObj = userDocObj_1;							//modify obj
	userRef
		.set(userDocObj)
		.then(() => alert("user successfully written to db"))
		.catch(() => alert("error writing to db"));
}

export function setupUserOrderDoc() {
	//modify object and name before pressing button
	const userOrdersRef = db
		.collection("users").doc("Wq33g2sv1Qbkj3RvxARGS419oNC2")
		.collection("user-orders").doc("store_0002"); //modify name (storeID)
	const userOrderDocObj = userOrderDocObj_2;							//modify obj
	userOrdersRef
		.set(userOrderDocObj, { merge: true })
		.then(() => alert("user-order successfully written to db user-orders"))
		.catch(() => alert("error writing to db"));
}

export function addOneUserOrder() {
	const userOrdersRef = db
		.collection("users").doc("l8IXwGbaW8RP6j9bGfJsQt5S0qj2") //samyipsh@gmail.com acct
		.collection("user-orders").doc("store_0002"); //modify name (storeID)
	const storeName = 'TomBakes'; //store_0001
    const modeOfTransfer = 'delivery';
	const bakeName = 'Strawberry Cake';
	const bakeSet = "1 Whole Cake";
	const bakePhotoURL = 'https://cdn.pixabay.com/photo/2016/10/27/22/12/cake-1776661_1280.jpg';
	const qty = 2;
	const unitprice = 40;
	const remarks = 'less sugar';
  
	writeOrderToUserOrders(userOrdersRef, storeName, qty, bakeSet, bakeName, unitprice, modeOfTransfer, remarks, bakePhotoURL )
}

export function delOneUserOrder() {
	const userOrdersRef = db
		.collection("users").doc("l8IXwGbaW8RP6j9bGfJsQt5S0qj2") //samyipsh@gmail.com acct
		.collection("user-orders").doc("store_0002"); //modify name (storeID)
	const storeName = 'TomBakes'; //store_0001
    const modeOfTransfer = 'delivery';
	const bakeName = 'Strawberry Cake';
	const bakeSet = "1 Whole Cake";
	const bakePhotoURL = 'https://cdn.pixabay.com/photo/2016/10/27/22/12/cake-1776661_1280.jpg';
	const qty = 2;
	const unitprice = 40;
	const remarks = 'less sugar';
  
	delOrderFromUserOrders(userOrdersRef, storeName, qty, bakeSet, bakeName, unitprice, modeOfTransfer, remarks, bakePhotoURL )
}