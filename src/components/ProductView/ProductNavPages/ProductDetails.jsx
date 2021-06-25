import React, { useState } from "react";
import { Table, Container } from "react-bootstrap";
import styles from "./ProductNavPages.module.css";

export default function ProductDetails() {
    const [productDesc, setProductDesc] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.");
	//replace with actual content
    const [productTags, setProductTags] = useState(["Chocolate", "Cookie", "Sweet", "Dark Chocolate"]);
	return (
        <Container className={styles.productDetailBox}>
            <dl className="row sm mb-3 mt-3">
                <dt className="col-sm-3">Description</dt>
                <dd className="col-sm-9">{productDesc}</dd>
                <dt className="col-sm-3">Tags</dt>
                <dd className="col-sm-9">{productTags.toString()}</dd>

                <dd className="col-sm-9 mt-4">
                    <Table striped bordered hover size="sm" >
                        <thead>
                            <tr>
                                <th>Per unit Price</th>
                                <th>Group</th>
                            </tr>
                            <tr>
                                <td>$5</td>
                                <td>Box of 2</td>
                            </tr>
                            <tr>
                                <td>$10</td>
                                <td>Box of 5</td>
                            </tr>
                        </thead>
                    </Table>
                </dd>
            </dl>
        </Container>
    )
}
