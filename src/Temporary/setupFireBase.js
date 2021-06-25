import React, { useState } from "react";
import { db } from "../config/firebase";

export function setupBakeDoc() {
    const bakeRef = db.collection("bakes").doc("bake_4213");
    const bakeDocObj = ({
        isAvailable     : true,
        bakeName        : "Strawberry Cake",
        bakeDesc        : "yum yumz",
        bakePhotoURL    : "www.somePhotoURL.com/cookie/",
        bakeAllergens   : "Contains Peanut, Hazelnut, may contain traces of Ginger",
        bakePriceAndQty : ({ 
                            7: "slice of cake",
                            40: "whole cake"
                        }),
        bakeTags        : ["tag1", "tag2", "tag3"],
        storeID         : "store_1234",
        storeName       : "Samway"
    })
    bakeRef.set(bakeDocObj)
        .then(() => alert("successfully written to db"))
        .catch(() => alert("error writing to db"));
}

export function setupStoreDoc() {
    const storeRef = db.collection("stores").doc("store_1234");
    const storeDocObj = ({
        isAvailable             : true,
        storeAvailability       : {
                                    availableStart: "2021/06/25",
                                    availableEnd: "2021/07/25"
                                },
        storeSale               : "50% off everything!",
        storeDeliveryBool       : true,
        storeDeliveryPref       :"North-South Region",
        storeSelfCollectionBool	: true,
        storeSelfCollectionPref : "Near MRTS, Buona Vista preferably",
        storeContact            : {
                                    contactFacebook: "",
                                    contactInstagram: "",
                                    contactEmail: "",
                                    contactNumber: ""
                                },
        storeName               : "samWay",
        storeOwnerID            : "user_1234",
        storeWebsite            : ""
    })
    storeRef.set(storeDocObj)
        .then(() => alert("successfully written to db"))
        .catch(() => alert("error writing to db"));
}