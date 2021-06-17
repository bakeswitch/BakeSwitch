import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./SellerProfile.module.css";

export default function SellerAbout(props) {
	const sellerDoc = props.sellerDoc;
	return (
		<Card body className={styles.tabBox}>
			{sellerDoc.storeDesc}
		</Card>
	);
}
