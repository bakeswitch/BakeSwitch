import { StylesProvider } from "@material-ui/core";
import { CardGiftcardSharp } from "@material-ui/icons";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./ProductNavPages.module.css";


export default function ProductAllergens(props) {
    const bakeData = props.bakeData;
    
    if (!bakeData) {
        return 
            <Container className={styles.productDetailBox}>
                <h3> Sorry, we are unable to load the allergens </h3>
            </Container>
    }


    const [productAllergens, setProductAllergens] = useState(["hazelnut", "oat", "milk"]);


    return (
        <Container className={styles.productDetailsBox}>
            <dl className="row sm mb-3 mt-3">
                <dt className="col-sm-3">Allergens</dt>
                <dd className="col-sm-9">{productAllergens.toString()}</dd>
            </dl>
        </Container>
    )
}
