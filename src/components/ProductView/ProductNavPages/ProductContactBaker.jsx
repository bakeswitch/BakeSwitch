import { StylesProvider } from "@material-ui/core";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./ProductNavPages.module.css";

export default function ProductContactBaker() {
    const [productAllergens, setProductAllergens] = useState(["hazelnut", "oat", "milk"]);
    	//replace with actual content
	return (
        <Container className={styles.cardDetailsBox}>
            <dl className="row sm mb-3 mt-3">
                <dt className="col-sm-3">Facebook</dt>
                <dd className="col-sm-9">www.facebook.com/bobthebuilder/</dd>
            </dl>
        </Container>
    )
}
