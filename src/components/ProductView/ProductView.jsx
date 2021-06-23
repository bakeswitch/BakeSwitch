import React, { useState } from "react";
import styles from "./ProductView.module.css";
import { useHistory } from "react-router-dom";
import { Container, FormControl, Badge, InputGroup, ButtonGroup, ToggleButton, Card, Nav, Row , Col, Button, Dropdown, DropdownButton } from "react-bootstrap"
import ProductNavPages from "./ProductNavPages";
import { AiFillStar } from "react-icons/ai";
import { FaHeart, FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { Divider } from "@material-ui/core";

function generateRating(num) {
    if (![0,1,2,3,4,5].includes(num)) {
        return new Error("num not btw 0-5");
    } else {
        return (
            <>  
                <AiFillStar className="text-warning mr-1" />
                <AiFillStar className="text-warning mr-1" />
                <AiFillStar className="text-warning mr-1" />
                <AiFillStar className="text-warning mr-1" />
                <AiFillStar className="text-secondary mr-1" />
            </>
        )                                 
    }    
}

export default function ProductView() {
    const [group, setGroup] = useState("box of 2");
    const history = useHistory();
    
    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'Delivery', value: '1', disabled: false},
        { name: 'Self-Collection', value: '2', disabled: true },
    ];

    const [qty, setQty] = useState(1); //for qty of item group

    const handleSelect = (eventKey) => {
        alert(`selected ${eventKey}`);
        history.push(`/bake-product/${eventKey}`);
    }

    const handleOnQtySelect = (e) => setGroup(e);

    return (
        <>
            <Row className={styles.row}>
                <Col xs={12} md={6} className="p-4">
                    <Card border="light">
                        <Card.Img src="https://cdn.pixabay.com/photo/2016/05/04/19/05/cookies-1372607_1280.jpg" rounded fluid />
                    </Card>
                </Col>
                <Col xs={12} md={6} className="p-4">
                    <h4> 
                        Chocolate hazelnut cookies <span className="badge bg-success mr-2">new</span>
                    </h4>
                    <div className="mb-3">
                        {generateRating(4)}|{" "}
                        <span className="text-muted small">
                            42 ratings and 4 reviews
                        </span>
                    </div>
                    <dl className="row sm mb-3">
                        <dt className="col-sm-3">Availability</dt>
                        <dd className="col-sm-9">Yes</dd>
                        <dt className="col-sm-3">Sold by</dt>
                        <dd className="col-sm-9">sellerName123</dd>
                        <dt className="col-sm-3">Obtain by</dt>
                        <dd className="col-sm-9">
                            <ButtonGroup className="mb-2">
                                {radios.map((radio, idx) => (
                                <ToggleButton className="p-0 me-4"
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant="white"
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                    disabled={radio.disabled}
                                >
                                    {radio.name}
                                </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </dd>
                        <label for="qty-select">Choose quantity:</label>
                        <select onSelect={handleOnQtySelect} id="qty-select" name={group} className="ms-2" style={{maxWidth: "24rem"}}>
                            <option value="Box of 5">Box of 2</option>
                            <option value="Box of 10">Box of 10</option>
                            <option value="Tub of 50">Tub of 50</option>
                        </select>
                    </dl>
                    <h3 className="font-weight-bold me-2 mt-5">$8</h3>
                    
                    <Row>
                        <Col sm={8}>
                            <InputGroup className="mb-2" variant="dark">
                                
                                <FaPlusSquare size={40} onClick={() => setQty(qty + 1)}/>
                                <FormControl value={qty} className="d-inline"/>  
                                <FaMinusSquare size={40} onClick={() => setQty(qty - 1)} />
                             

                                <Button variant="primary" title="Send Order Request"><FiSend /> Send Order Request</Button>
                                <Button variant="outline-secondary" title="Add to wishlist"><FaHeart /></Button>
                            </InputGroup>
                        </Col>
                    </Row>
                                    
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