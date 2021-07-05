import React, { useState } from "react";
import { db } from "../config/firebase";
import { bakeDocObj_1, bakeDocObj_2, bakeDocObj_3 } from "./test-bakes";
import { storeDocObj_1, storeDocObj_2 } from "./test-stores";

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
	const storeRef = db.collection("stores").doc("store_0002"); //modify name
	const storeDocObj = storeDocObj_2;							//modify obj
	storeRef
		.set(storeDocObj)
		.then(() => alert("store successfully written to db"))
		.catch(() => alert("error writing to db"));
}
