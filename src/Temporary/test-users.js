export const userDocObj_1 = {
    email           :'bakeswitch@gmail.com',
    phoneNumber	    :"87654321",
    isManualSignUp  :false,
    isSeller	    :true,
    photoURL	    :"https://lh3.googleusercontent.com/a/AATXAJyAulC3ICkJnisOUSmjb3alFf1HRfeMa20jc4rO=s96-c",
    storeID	        :"RBhzVRjDNZKMWOhUPPCm",
    username	    :"Bake Switch"
        /* favourites	    : {
        storeID_1: {name: """", profilepic:""""},
        storeID_2: {…}
        }" */
    // user-order	        : SUBCOLLECTION,
};

export const userOrderDocObj_1 = {
    storeName   :'TomTakes', //store_0001
    orderObj	:[
        {modeOfTransfer: 'delivery', bakeName: 'Chocolate Hazelnut Cookies', bakeSet: "Box of 2", bakePhotoURL: 'https://cdn.pixabay.com/photo/2016/05/04/19/05/cookies-1372607__480.jpg', qty: 2, unitPrice: 5, remarks: ''}, 
        {modeOfTransfer: 'delivery', bakeName: 'Chocolate Hazelnut Cookies', bakeSet: "Box of 5", bakePhotoURL: 'https://cdn.pixabay.com/photo/2016/05/04/19/05/cookies-1372607__480.jpg', qty: 1, unitPrice: 9.5, remarks: ''}, 
        {modeOfTransfer: 'collection', bakeName: 'Assorted Cupcakes', bakeSet: "Box of 25", bakePhotoURL: 'https://media.istockphoto.com/photos/different-flavours-cupcakes-picture-id1251444635?b=1&k=6&m=1251444635&s=170667a&w=0&h=jrfRMjs40vlFO9oKNsSrelDcMyRF3MIF-VuXLBUoD3M=', qty: 1, unitprice: 25, remarks: '6 Chocolate flavor, 6 Strawberry flavor, Collection on 24th August'}, 
    ]
};

export const userOrderDocObj_2 = {
    storeName   :'TomBakes', //store_0001
    orderObj	:[
        {modeOfTransfer: 'delivery', bakeName: 'Strawberry Cake', bakeSet: "1 Slice of Cake", bakePhotoURL: 'https://cdn.pixabay.com/photo/2016/10/27/22/12/cake-1776661_1280.jpg', qty: 1, unitPrice: 7, remarks: 'less sugar'}, 
    ]
};
