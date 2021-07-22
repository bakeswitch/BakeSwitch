import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import PricingOptionsDisplay from "./PricingOptionsDisplay";

export default function AddPricingInfo(props) {
	const [pricingObj, setPricingObj] = useState({});
	const [qty, setQty] = useState();
	const [price, setPrice] = useState();

	function handleAdd() {
		// Only add if price and qty values are not empty
		if (price && qty) {
			setPricingObj((prevObj) => {
				return { ...prevObj, [price]: qty };
			});
		}
	}

	useEffect(() => {
		props.updateMap(pricingObj);
	}, [pricingObj]);

	return (
		<Form.Group className="mt-4">
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
			<div className="mt-1 mb-2">
				<Button className="mt-2" variant="secondary" onClick={handleAdd} size="sm">
					Add another option
				</Button>
				<Button className="mt-2 ms-3" variant="warning" onClick={handleAdd} size="sm">
					Confirm
				</Button>
			</div>
			<Form.Label>Pricing Options</Form.Label>
			<Form.Text>
				<PricingOptionsDisplay obj={pricingObj} />
			</Form.Text>
		</Form.Group>
	);
}
