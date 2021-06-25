import React, { useState, useEffect } from "react";
import styles from "./ProductView.module.css";
import { useHistory } from "react-router-dom";
import { Container, FormControl, Badge, InputGroup, ButtonGroup, ToggleButton, Card, Nav, Row , Col, Button, Dropdown, DropdownButton } from "react-bootstrap"
import ProductNavPages from "./ProductNavPages";
import { AiFillStar } from "react-icons/ai";
import { FaHeart, FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { db } from "../../config/firebase";

function errorPage(errString) {
    return (
        <>
            <h3> Sorry, we are unable to find the page you are looking for </h3>
            <p> Error: {errString} </p>
        </>
    )
}

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


export default function ProductView(props) {
    const bakeID = props.bakeID;
    const bakeRef = db.collection("bakes").doc(bakeID);
    const [isLoading, setIsLoading] = useState(false);
    const [bakeData, setBakeData] = useState();
    const [storeID, setStoreID] = useState();
    const [storeData, setStoreData] = useState();

    const history = useHistory();
    
    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'Delivery', value: '1', disabled: storeData?.storeDeliveryBool},
        { name: 'Self-Collection', value: '2', disabled: storeData?.storeSelfCollectionBool },
    ];

    const [qty, setQty] = useState(1); //for qty of item group

    const handleOnQtySelect = (e) => setGroup(e);

    function setBakeDocAndStoreDoc() {
        //set bakedoc
        setIsLoading(true);
        bakeRef.get().then(doc => {         
            if (doc && doc.exists) {
                setBakeData(doc.data())
                alert("bakeDoc set");
            } else {
                return alert("bakeID invalid? unable to load doc");
            }
        }).catch(err => alert("unable to set bake data, err :" +  err))
        .finally(()=> setIsLoading(false));

        //set storedoc
        setIsLoading(true);
        const storeID = bakeData.storeID;
        const storeRef = db.collection("stores").doc(storeID);
        storeRef.get().then(doc => {        
            if (doc && doc.exists) {
                setStoreData(doc.data())
                alert("storeDoc set");
            } else {
                alert("storeID invalid? unable to load doc");
            }
        }).catch(err => alert("unable to retrieve store data, err :" +  err))
        .finally(()=> setIsLoading(false));
    }

    useEffect(setBakeDocAndStoreDoc,[]);

    return !isLoading && 
        (bakeData == null) 
            ? errorPage("no data available for this product")
            : (
            <>
                <Row className={styles.row}>
                    <Col xs={12} md={6} className="p-4">
                        <Card border="light">
                            <Card.Img src={bakeData?.bakePhotoURL} rounded fluid />
                        </Card>
                    </Col>
                    <Col xs={12} md={6} className="p-4">
                        <h4> 
                            {bakeData?.bakeName} <span className="badge bg-success mr-2">new</span>
                        </h4>
                        <div className="mb-3">
                            {generateRating(4)}|{" "}
                            <span className="text-muted small">
                                42 ratings and 4 reviews
                            </span>
                        </div>
                        <dl className="row sm mb-3">
                            <dt className="col-sm-3">Is Availabile</dt>
                            <dd className="col-sm-9">{bakeData?.isAvailable ? "true" : "false"}</dd>
                            <dt className="col-sm-3">Sold by</dt>
                            <dd className="col-sm-9">{bakeData?.storeName}</dd>
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
                            <select onSelect={handleOnQtySelect} id="qty-select" className="ms-2" style={{maxWidth: "24rem"}}>
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
                <ProductNavPages 
                    bakeData = {bakeData} 
                    storeDoc = {storeData}
                />
            </>
        )
}

//use  Bootstrap Modal for popup