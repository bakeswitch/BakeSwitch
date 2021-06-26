import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function AddPricingInfo(props) {
	const [pricingObj, setPricingObj] = useState({});
	const [priceArr, setPriceArr] = useState([]);
	const [qty, setQty] = useState();
	const [price, setPrice] = useState();

	function handleAdd() {
		setPricingObj((prevObj) => {
			return { ...prevObj, [price]: qty };
		});
		setPriceArr((prevArr) => {
			return [...prevArr, price];
		});
	}

	function handleConfirm() {
		handleAdd();
	}

	useEffect(() => {
		props.updateMap(pricingObj);
		props.updateArr(priceArr);
	}, [pricingObj]);

	return (
		<Form.Group className="mt-4" controlId="formPriceNQty">
			<Form.Label>Product Pricing</Form.Label>
			<InputGroup>
				<InputGroup.Text>Pricing</InputGroup.Text>
				<Form.Control
					type="text"
					placeholder="Set or quantity"
					onChange={(e) => setQty(e.target.value)}
					required
				/>
				<Form.Control
					type="number"
					step="0.05"
					placeholder="Price ($)"
					onChange={(e) => setPrice(e.target.value)}
					required
				/>
			</InputGroup>
			<Form.Text className="text-muted">
				You may add multiple pricing options by clicking on the add button below and entering a new
				combination (e.g. Qty: Box of 4, Price($): 12). Please confirm your pricing options before
				proceeding.
			</Form.Text>
			<div className="mt-2">
				<Form.Text>
					<strong>
						Pricing options (Price: Qty):
						{JSON.stringify(pricingObj)}
					</strong>
				</Form.Text>
			</div>
			<Button className="mt-2" onClick={handleAdd} size="sm">
				Add another option
			</Button>
			<Button className="mt-2 ms-3" variant="warning" onClick={handleConfirm} size="sm">
				Confirm
			</Button>
		</Form.Group>
	);
}
