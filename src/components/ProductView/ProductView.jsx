import React, { useRef } from "react";
import styles from "./ProductView.module.css";
import { useHistory } from "react-router-dom";
import { Card, Nav, Row , Col, Button } from "react-bootstrap"
import ProductNavPages from "./ProductNavPages";

export default function ProductView() {
    const history = useHistory();
    const handleSelect = (eventKey) => {
        alert(`selected ${eventKey}`);
        history.push(`/bake-product/${eventKey}`);
    }

    return (
        <>
            <Row>
                <Col xs={12} md={8}>
                    <Card border="light" className="m-4">
                        <Card.Body>
                            <Card.Title className={styles.itemName}>Chocolate Hazelnut Cookies</Card.Title>
                            <Card.Img variant="bottom" src="https://cdn.pixabay.com/photo/2016/05/04/19/05/cookies-1372607_1280.jpg" />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>

                </Col>
            </Row>
            <Card>
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#details" onSelect={handleSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey="details">details</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="reviews">reviews</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="allergens">allergens</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="contact">contact baker</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <ProductNavPages />
            </Card>
        </>
    )
}

//use  Bootstrap Modal for popup