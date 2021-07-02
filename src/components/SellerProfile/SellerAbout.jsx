import React from "react";
import { Card } from "react-bootstrap";
import styles from "./SellerProfile.module.css";
import UpdateString from "../helperComponents/UpdateString";

export default function SellerAbout(props) {
	const sellerDoc = props.sellerDoc;
	return (
		<Card body className={styles.tabBox}>
			{sellerDoc.storeDesc}
			{props.isOwnStore && (
				<UpdateString
					item={sellerDoc.storeDesc}
					field="storeDesc"
					docRef={props.storeRef}
					isTextArea={true}
				/>
			)}
		</Card>
	);
}
