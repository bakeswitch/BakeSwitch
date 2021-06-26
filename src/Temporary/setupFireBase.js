import React, { useState } from "react";
import { db } from "../config/firebase";

export function setupBakeDoc() {
    const bakeRef = db.collection("bakes").doc("bake_2222");
    const bakeDocObj = ({
        isAvailable     : false,
        bakeName        : "Assorted Cupcakes",
        bakeDesc        : "Variety of cupcakes, mix n match! Order in bulk for parties or gatherings. Contact for more detail.",
        bakePhotoURL    : "https://media.istockphoto.com/photos/different-flavours-cupcakes-picture-id1251444635?b=1&k=6&m=1251444635&s=170667a&w=0&h=jrfRMjs40vlFO9oKNsSrelDcMyRF3MIF-VuXLBUoD3M=",
        bakeAllergens   : "Depends on cupcake flavor",
        bakePriceAndQty : ({ 
                            3: "1 cupcake",
                            9.5: "small box of 4 cupcakes",
                            25: "large box of 12 cupcakes"
                        }),
        bakePriceArr    : [3,9.5,25],
        bakeTags        : ["strawberry", "chocolate", "banana"],
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