import { StylesProvider } from "@material-ui/core";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./ProductNavPages.module.css";

export default function ProductAllergens() {
    const [productAllergens, setProductAllergens] = useState(["hazelnut", "oat", "milk"]);
    	//replace with actual content
	return (
        <Card.Body className={styles.productDetailCard}>
            <dl className="row sm mb-3 mt-3">
                <dt className="col-sm-3">Allergens</dt>
                <dd className="col-sm-9">{productAllergens.toString()}</dd>
            </dl>
        </Card.Body>
    )
}
