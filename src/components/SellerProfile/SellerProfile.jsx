import React, { useState, useEffect } from "react";
import { Card, Tabs, Tab } from "react-bootstrap";
import { db } from "../../config/firebase";
import SellerAbout from "./SellerAbout";
import SellerBakeSale from "./SellerBakeSale";
import SellerContact from "./SellerContact";
import SellerPref from "./SellerPref";
import UpdateString from "../helperComponents/UpdateString";
import styles from "./SellerProfile.module.css";

export default function SellerProfile(props) {
	// Takes in storeID as props
	const storeRef = db.collection("stores").doc(props.storeID);
	// Pass boolean isOwnStore prop. Seller can edit info if true (accessed from StoreInformation page)
	const isOwnStore = props.isOwnStore;

	const [storeRec, setStoreRec] = useState();
	const [loading, setLoading] = useState(true);
	const [key, setKey] = useState("about");

	useEffect(() => {
		// onSnapshot provides real time updates
		storeRef.onSnapshot(function (doc) {
			if (doc && doc.exists) {
				setStoreRec(doc.data());
			}
			setLoading(false);
		});

		// // Retrieve data from document as a document snapshot. Store in storeRec variable.
		// storeRef
		// 	.get()
		// 	.then((snapshot) => setStoreRec(snapshot.data()))
		// 	.then(() => setLoading(false));
	}, []);

	return (
		!loading && (
			<Card>
				<Card.Img
					variant="top"
					alt="Image from store"
					src={storeRec.storeLogo}
					style={{ width: "100%", height: "300px" }}
				/>
				{isOwnStore && (
					<UpdateString
						item={storeRec.storeLogo}
						field="storeLogo"
						docRef={storeRef}
					></UpdateString>
				)}

				<div className={styles.storeName}>
					<h3>{storeRec.storeName}</h3>
				</div>

				<Card.Body>
					<Tabs activeKey={key} onSelect={(k) => setKey(k)} transition={false}>
						<Tab eventKey="about" title="About">
							<SellerAbout sellerDoc={storeRec} isOwnStore={isOwnStore} storeRef={storeRef} />
						</Tab>
						<Tab eventKey="bakeSale" title="Bake Sale">
							<SellerBakeSale sellerDoc={storeRec} isOwnStore={isOwnStore} storeRef={storeRef} />
						</Tab>
						<Tab eventKey="contact" title="Contact">
							<SellerContact sellerDoc={storeRec} isOwnStore={isOwnStore} storeRef={storeRef} />
						</Tab>
						<Tab eventKey="storePref" title="Store Preferences">
							<SellerPref sellerDoc={storeRec} isOwnStore={isOwnStore} storeRef={storeRef} />
						</Tab>
					</Tabs>
				</Card.Body>
			</Card>
		)
	);
}
