const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = "bakeswitch-orbital";

const myId = "user_abc";
const theirId = "user_xyz";
const myAuth = {uid: myId, email: "abc@gmail.com"};
const theirAuth = {uid: theirId, email: "xyz@gmail.com"};

const myStoreId = "user_abc_store";
const theirStoreId = "user_xyz_store";

function getFirestore(auth) {
    return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: auth}).firestore();
}

function getAdminFirestore() {
    return firebase.initializeAdminApp({projectId: MY_PROJECT_ID}).firestore();
}

function setupTheirIdDocument(whichCollection) {
    const admin = getAdminFirestore();
    admin.collection(whichCollection).doc(theirId).set({foo : "bar"});
}

beforeEach(async() => {
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});
});

describe("USER database queries", () => {

    it("Can't read from user database no Auth", async () => {
        const db = getFirestore(null);
        const testdoc = db.collection("users").doc("testdoc");
        await firebase.assertFails(testdoc.get());
    });

    it("Can't write to user database no Auth", async () => {
        const db = getFirestore(null);
        const testdoc = db.collection("users").doc("testdoc");
        await firebase.assertFails(testdoc.set({foo : "bar"}));
    });

    it("Authenticated user write own entry", async() => {
        const db = getFirestore(myAuth);
        const testdoc = db.collection("users").doc("user_abc");
        await firebase.assertSucceeds(testdoc.set({foo : "bar"}));
    });

    it("Authenticated user read own entry", async() => {
        const db = getFirestore(myAuth);
        const testdoc = db.collection("users").doc("user_abc");
        await firebase.assertSucceeds(testdoc.get());
    });

    it("Cannot read user xyz's data as user abc", async () => {
        setupTheirIdDocument("users");
        const db = getFirestore(myAuth);
        const testdoc = db.collection("users").doc(theirId);
        await firebase.assertFails(testdoc.get());
    });

    it("Cannot write user xyz's data as user abc", async () => {
        setupTheirIdDocument("users");
        const db = getFirestore(myAuth);
        const testdoc = db.collection("users").doc(theirId);
        await firebase.assertFails(testdoc.set({foo: "barbar"}));
    });

    it("Cannot read user orders non authenticated", async() => {
        const db = getFirestore(null);
        const testdoc = db.collection("users").doc(myId).collection("user-orders");
        await firebase.assertFails(testdoc.get());
    });

    it("Authenticated user read own orders", async() => {
        const db = getFirestore(myAuth);
        const testdoc = db.collection("users").doc(myId).collection("user-orders").doc(myId);
        await firebase.assertSucceeds(testdoc.get());
    });

    it("Cannot read user xyz orders as user abc", async() => {
        // create user order document as user xyz 
        const db = getFirestore(theirAuth);
        const setupdoc = db.collection("users").doc(theirId).collection("user-orders").doc(theirId);
        await setupdoc.set({foo: "bar"});

        // try to get user order document as user abc
        const db1 = getFirestore(myAuth);
        const testdoc = db1.collection("users").doc(theirId).collection("user-orders").doc(theirId);
        await firebase.assertFails(testdoc.get());
    });

    it("Cannot write user xyz orders as user abc", async() => {
        // create user order document as user xyz 
        const db = getFirestore(theirAuth);
        const setupdoc = db.collection("users").doc(theirId).collection("user-orders").doc(theirId);
        await setupdoc.set({foo: "bar"});

        // try to set user order document as user abc
        const db1 = getFirestore(myAuth);
        const testdoc = db1.collection("users").doc(theirId).collection("user-orders").doc(theirId);
        await firebase.assertFails(testdoc.set({foo: "bar"}));
    });

});

describe("STORE database queries", () => {
    it("Anyone can read from stores", async() => {
        const db = getFirestore(null);
        const testdoc = db.collection("stores").doc(myId);
        await firebase.assertSucceeds(testdoc.get());
    });

    it("Non authenticated users cannot create stores", async() => {
        const db = getFirestore(null);
        const testdoc = db.collection("stores").doc(myId);
        await firebase.assertFails(testdoc.set({foo: "bar"}));
    });

    it("Store owners can update/delete their store records", async() => {
        // create store for user id `myId`
        const db = getAdminFirestore();
        const setupdoc = db.collection("stores").doc(myStoreId);
        await setupdoc.set({storeOwnerID: myId});

        const db1 = getFirestore(myAuth);
        const storedoc = db1.collection("stores").doc(myStoreId);
        await firebase.assertSucceeds(storedoc.set({foo: "barbar"}));
    });

    it("Other people cannot alter records of other stores", async() => {
        // create store for their id `theirId`
        const db = getAdminFirestore();
        const setupdoc = db.collection("stores").doc(theirStoreId);
        await setupdoc.set({storeOwnerID: theirId});

        // try to access theirStore as myAuth authenticated.
        const db1 = getFirestore(myAuth);
        const testdoc = db1.collection("stores").doc(theirStoreId);
        await firebase.assertFails(testdoc.set({foo: "barbar"}));
    });
})

describe("BAKES database queries", () => {

    it("Anyone can READ the bakes available ", async () => {
        const db = getFirestore(null);
        const testdoc = db.collection("bakes").doc(myId);
        await firebase.assertSucceeds(testdoc.get());
    });

    it("Non authenticated users cannot CREATE bakes", async () => {
        const db = getFirestore(null);
        const testdoc = db.collection("bakes").doc(myId);
        await firebase.assertFails(testdoc.set({foo: "bar"}));
    });

    it("Authenticated users cannot CREATE bakes if they don't have a store", async() => {
        const db = getFirestore(myAuth);
        const testdoc = db.collection("bakes").doc(myId);
        await firebase.assertFails(testdoc.set({storeID: myStoreId}));
    });

    it("Authenticated users can CREATE bakes if they have a store", async() => {
        // create store in db
        const db = getFirestore(myAuth);
        const setupstore = db.collection("stores").doc(myStoreId);
        await setupstore.set({foo : "bar", storeOwnerID: myId});

        const testbake = db.collection("bakes").doc(myId);
        await firebase.assertSucceeds(testbake.set({storeID: myStoreId, foo: "bar"}));
    });

    it("Authenticated users can UPDATE/DELETE bakes of their own stall", async () => {
        // create store in db
        const db = getAdminFirestore();
        const setupstore = db.collection("stores").doc(myStoreId);
        await setupstore.set({foo : "bar", storeOwnerID: myId});

        // create bake. 
        const db1 = getFirestore(myAuth);
        const testbake = db1.collection("bakes").doc(myId);
        await testbake.set({storeID: myStoreId, foo: "bar"});

        // update bake as owner
        await firebase.assertSucceeds(testbake.update({foo: "barbar"}));
    });

    it("Authenticated users cannot UPDATE/DELETE bakes of other stalls", async () => {
        // create store in db
        const db = getAdminFirestore();
        const setupstore = db.collection("stores").doc(theirStoreId);
        await setupstore.set({foo : "bar", storeOwnerID: theirId});

        // create bake. 
        const db1 = getFirestore(theirAuth);
        const testbake = db1.collection("bakes").doc(theirId);
        await testbake.set({storeID: theirStoreId, foo: "bar"});

        // update other bake
        const db2 = getFirestore(myAuth);
        const testbake_ = db2.collection("bakes").doc(theirId);
        await firebase.assertFails(testbake_.update({foo: "barbarbar"}));
    });
});


describe("ORDERS database queries", async() => {
    it("Authenticated users can create orders", async() => {
        const db = getAdminFirestore();
        const setupstore = db.collection("stores").doc(myStoreId);
        await setupstore.set({foo : "bar", storeOwnerID: myId});
        
        const db1 = getFirestore(myAuth);
        const testdoc = db1.collection("orders").doc(myId);
        await firebase.assertSucceeds(testdoc.set({storeID: myStoreId, foo: "bar"}));
    });

    it("Non authenticated users cannot create orders", async() => {
        const db = getAdminFirestore();
        const setupstore = db.collection("stores").doc(myStoreId);
        await setupstore.set({foo : "bar", storeOwnerID: myId});

        const db1 = getFirestore(null);
        const testdoc = db1.collection("orders").doc(myId);
        await firebase.assertFails(testdoc.set({storeID: myStoreId, foo: "bar"}));
    });

    it("Owners of the store can update orders for his stall", async() => {
        const db = getAdminFirestore();
        const setupstore = db.collection("stores").doc(myStoreId);
        await setupstore.set({foo : "bar", storeOwnerID: myId});

        const db1 = getFirestore(myAuth);
        const testdoc = db1.collection("orders").doc(myId);
        await testdoc.set({storeID: myStoreId, foo: "bar"});

        await firebase.assertSucceeds(testdoc.update({foo : "barbar"}));
    });

    it("Owners of store cannot update orders of other stalls", async() => {
        const db = getAdminFirestore();
        const setupstore = db.collection("stores").doc(theirStoreId);
        await setupstore.set({foo : "bar", storeOwnerID: theirId});

        const db1 = getFirestore(theirAuth);
        const testdoc = db1.collection("orders").doc(theirId);
        await testdoc.set({storeID: theirStoreId, foo: "bar"});

        const db2 = getFirestore(myAuth);
        await firebase.assertFails(db2.collection("orders").doc(theirId).update({foo : "barbar"}));
    });



})

after(async() => {
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});
});