import React, { useState } from "react";
import ProductView from "../components/ProductView";
import styles from "./pages.module.css";


export default function BakeProduct(props) {

	return (
		<div className={styles.contentBox}>
			<ProductView bakeID={props.bakeID}/>
		</div>
	);
}
