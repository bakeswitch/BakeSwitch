import React, { useState, useEffect } from "react";
import styles from "./ProductView.module.css";
import { FormControl, Badge, InputGroup, ButtonGroup, ToggleButton, Card, Nav, Row , Col, Button, Dropdown, DropdownButton } from "react-bootstrap"
import ProductNavPages from "./ProductNavPages";

import { FaHeart, FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { db } from "../../config/firebase";
import { orderPriceAndQtyArr } from "../../helperFunctions/handleDataFunctions";
import ErrorCard from "../helperComponents/ErrorCard";
import { RatingDetails } from "../helperComponents/RatingOutOf5.jsx";

export default function ProductView(props) {
    const bakeID = props.bakeID;
    const bakeRef = db.collection("bakes").doc(bakeID);
    const [isLoading, setIsLoading] = useState(false);
    const [bakeData, setBakeData] = useState();
    const [storeData, setStoreData] = useState();
    const [indexPair, setIndexPair] = useState(0);
    const [radioValue, setRadioValue] = useState('1');
    const [isLiked, setIsLiked] = useState(false); //Link to wishlist 
    //RADIO DOESNT WORK, call it aft storeData defined

    //find way to add storeData?.storeDeliveryBool && storeData?.storeSelfCollectionBool
    const radios = [
        { name: 'Delivery', value: '1', disabled: false },
        { name: 'Self-Collection', value: '2', disabled: false},
    ];

    const [qty, setQty] = useState(1); //for qty of item group

    function fillBakeData() {
        //set bakedoc
        bakeRef.get().then(snapshot => {
            setIsLoading(true);
            if (snapshot && snapshot.exists) {
                setBakeData(snapshot.data())
                // alert("bakeData set");
            } else {
                return alert("bakeID invalid? unable to load doc");
            }
        }).catch(err => alert("unable to set bake data, err :" +  err))
        .finally(() => setIsLoading(false));
    }

    function fillStoreData(bakeData) {
        const storeID = bakeData.storeID;
        const storeRef = db.collection("stores").doc(storeID);
        storeRef.get().then(snapshot => {    
            setIsLoading(true);    
            if (snapshot && snapshot.exists) {
                setStoreData(snapshot.data())
                // alert("storeData set" + JSON.stringify(snapshot.data()));
            } else {
                alert("storeID invalid? unable to load doc");
            }
        }).catch((err) => alert("unable to set store data" + err))
        .finally(() => setIsLoading(false));
    }

    function getRealTimeUpdates() {
		bakeRef.onSnapshot((snapshot) => {
            setIsLoading(true);
			if (snapshot && snapshot.exists) {
				fillStoreData(snapshot.data());
			} else {
				alert("snapshot doesnt exist for realtime update");
			}
            setIsLoading(false);
		})
    }

    useEffect(() => {
        fillBakeData();
        getRealTimeUpdates();
	},[]);

    	
	if (!bakeData) { 
		return ErrorCard();
	}

    const { bakePhotoURL 	= 'default_bake_name', 
            bakeName  		= 'default_store_id',
            // bakeDesc 		= 'default_bake_desc',
            isAvailable     = 'default_is_available',
            storeName       = 'default_store_name',     
            numOfRatings    = 0,
            numOfStars      = 0,} = bakeData;
    const   orderedPnQArr = orderPriceAndQtyArr(bakeData);

    return !isLoading && (
        <>  
            <Row className={styles.row}>
                <Col xs={12} md={7} className="p-4">
                    <Card border="light">
                        {/* make carousel here? */}
                        <Card.Img src={bakePhotoURL} rounded fluid />
                    </Card>
                </Col>
                <Col xs={12} md={5} className="p-4">
                    <h3 className="mb-0"> 
                        {bakeName} <span className="badge bg-success mr-2">new</span>
                    </h3>
                    <div className="mb-3">
                        <RatingDetails 
                            numOfRatings = {numOfRatings}
                            numOfStars = {numOfStars}
                        />
                    </div>
                    <dl className="row sm mb-3">
                        <dt className="col-sm-4">Is Availabile</dt>
                        <dd className="col-sm-8 p-0">{isAvailable ? "true" : "false"}</dd>
                        <dt className="col-sm-4">Sold by</dt>
                        <dd className="col-sm-8 p-0">{storeName}</dd>
                        <dt className="col-sm-4">Obtain by</dt>
                        <dd className="col-sm-8 p-0">
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
                        <select 
                            onChange={e => console.log((e.target))
                                // setIndexPair(e.target.value)
                            } 
                            id="qty-select" 
                            className="ms-2" 
                            style={{maxWidth: "24rem"}}>
                            {orderedPnQArr.map((pnqPair, index) => 
                                <option value={index} key={index} readOnly>
                                    {pnqPair[1]}
                                </option>
                            )}
                        </select>
                    </dl>
                    <h3 className="font-weight-bold me-2 mt-3">${orderedPnQArr[indexPair][0]}</h3>
                    
                    <Row>
                        <Col sm={8}>
                            <InputGroup className="mb-2" variant="dark">
                                
                                <FaPlusSquare size={40} onClick={() => setQty(qty + 1)}/>
                                <FormControl value={qty} className="d-inline bg-light" readOnly/>  
                                <FaMinusSquare size={40} onClick={() => setQty(qty - 1)} />
                            </InputGroup>
                        </Col>
                        <Col sm={12}>
                            <ButtonGroup>
                                <Button 
                                    className={styles.noFocusButton}
                                    variant="primary" 
                                    title="Send Order Request">
                                    <FiSend /> Send Order Request
                                </Button>
                                <Button
                                    className={styles.noFocusButton} 
                                    variant="outline-secondary" 
                                    title="Add to wishlist"
                                    onClick={() => setIsLiked(prvBool => !prvBool)}
                                >
                                    <FaHeart color={isLiked?'red':'black'} />
                                </Button>
                            </ButtonGroup>
                            
                        </Col>
                    </Row>
                                    
                </Col>
            </Row>
            <ProductNavPages 
                bakeData = {bakeData} 
                storeData = {storeData}
                orderedPnQArr = {orderedPnQArr}
            />
        </>
    )
}

//use  Bootstrap Modal for popup