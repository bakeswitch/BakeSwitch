import React, { useState } from "react";
import { Table, Container } from "react-bootstrap";
import styles from "./ProductNavPages.module.css";


export default function ProductDetails(props) {
    const bakeData = props.bakeData;
    const orderedPnQArr = props.orderedPnQArr;

    if (!(bakeData && orderedPnQArr)) { 
        return 
            <Container className={styles.productDetailBox}>
                <h3> Sorry, we are unable to load the product details </h3>
            </Container>
    }

    const { bakeDesc  = 'default_bake_desc',
            bakeTags  = ["no tags attached"] } = bakeData;

    // const [productDesc, setProductDesc] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.");
	// //replace with actual content
    // const [productTags, setProductTags] = useState(["Chocolate", "Cookie", "Sweet", "Dark Chocolate"]);
	return (
        <Container className={styles.productDetailBox}>
            <dl className="row sm mb-3 mt-3">
                <dt className="col-sm-3">Description</dt>
                <dd className="col-sm-9">{bakeDesc}</dd>
                <dt className="col-sm-3">Tags</dt>
                <dd className="col-sm-9">{bakeTags.toString()}</dd>

                <dd className="col-sm-9 mt-4">
                    <Table striped bordered hover size="sm" >
                        <thead>
                            <tr>
                                <th>Per unit Price</th>
                                <th>Group</th>
                            </tr>
                            {(orderedPnQArr).map(priceAndQtyArr => {
                                return <tr>
                                    <td>S${priceAndQtyArr[0]}</td>
                                    <td>{priceAndQtyArr[1]}</td>
                                </tr>
                            })}

                            {/* <td>$5</td>
                            <td>Box of 2</td>

                            <tr>
                                <td>$10</td>
                                <td>Box of 5</td>
                            </tr> */}
                        </thead>
                    </Table>
                </dd>
            </dl>
        </Container>
    )
}
