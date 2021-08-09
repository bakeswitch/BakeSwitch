import React from "react";
import { Card } from "react-bootstrap";
import styles from "./SellerProfile.module.css";
import UpdateString from "../helperComponents/UpdateString";

export default function SellerAbout(props) {
	const { sellerDoc,
			isOwnStore } = props;
	const { storeDesc } = sellerDoc
	return (
		<Card body className={styles.tabBox}>
			{isOwnStore 
				? <UpdateString
					item={sellerDoc.storeDesc}
					field="storeDesc"
					docRef={props.storeRef}
					isTextArea={true}
				/>
				: storeDesc
			}
		</Card>
	);
}
