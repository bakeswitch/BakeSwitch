import React, { useState } from "react";
import { db } from "../config/firebase";

export function setupBakeDoc() {
	const bakeRef = db.collection("bakes").doc("bake_2222");
	const bakeDocObj = {
		isAvailable: false,
		bakeName: "Assorted Cupcakes",
		bakeDesc:
			"Variety of cupcakes, mix n match! Order in bulk for parties or gatherings. Contact for more detail.",
		bakePhotoURL:
			"https://media.istockphoto.com/photos/different-flavours-cupcakes-picture-id1251444635?b=1&k=6&m=1251444635&s=170667a&w=0&h=jrfRMjs40vlFO9oKNsSrelDcMyRF3MIF-VuXLBUoD3M=",
		bakeAllergens: "Depends on cupcake flavor",
		bakePriceAndQty: {
			3: "1 cupcake",
			9.5: "small box of 4 cupcakes",
			25: "large box of 12 cupcakes",
		},
		bakeTags: ["strawberry", "chocolate", "banana"],
		itemPromo: "Buy 3 get 1 free",
		storeID: "store_1234",
		storeName: "Samway",
	};
	bakeRef
		.set(bakeDocObj)
		.then(() => alert("successfully written to db"))
		.catch(() => alert("error writing to db"));
}

export function setupStoreDoc() {
	const storeRef = db.collection("stores").doc("store_1234");
	const storeDocObj = {
		isAvailable: true,
		availabilityStart: "2021/06/25",
		availabilityEnd: "2021/07/25",
		bakeSaleDesc: "Holiday Sale",
		bakeSalePromo: "50% off everything!",
		deliveryBool: true,
		deliveryDetails: "North-South Region",
		selfCollectionBool: true,
		selfCollectionDetails: "Near MRTS, Buona Vista preferably",
		email: "",
		fbLink: "",
		instaLink: "",
		teleHandle: "",
		phoneNum: "",
		websiteLink: "",
		storeName: "samWay",
		storeDesc: "Selling apple pies and cheese tarts",
		storeLogo: "",
		storeOwnerID: "user_1234",
	};
	storeRef
		.set(storeDocObj)
		.then(() => alert("successfully written to db"))
		.catch(() => alert("error writing to db"));
}

export function setupOrdersDoc() {
	const ordersRef = db.collection("orders");
	const orderDocObj = {
		isApproved: 0,
		userID: "Wq33g2sv1Qbkj3RvxARGS419oNC2",
		userContact: { email: "bakeswitch@gmail.com", number: "87654321" },
		storeID: "RBhzVRjDNZKMWOhUPPCm",
		orderBody: "Chocolate cookie: 1 x (Box of 5), Strawberry tart: 3 x (Box of 10)",
	};
	ordersRef
		.add(orderDocObj)
		.then(() => alert("successfully written to db"))
		.catch(() => alert("error writing to db"));
}
