import React, { useState, useRef, useEffect } from "react";
import { Button, Alert, Form } from "react-bootstrap";
import AddPricingInfo from "./AddPricingInfo";
import AddTags from "./AddTags";
import { db } from "../../config/firebase";

export default function AddProduct(props) {
	const storeID = props.storeID;
	const [storeRec, setStoreRec] = useState();

	const pdtName = useRef();
	const pdtDesc = useRef();
	const photoURL = useRef();
	const allergens = useRef();
	const pdtPromo = useRef();
	const [tags, setTags] = useState([]);
	const [pricing, setPricing] = useState({});
	const [priceArr, setPriceArr] = useState([]);

	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState("");
	const [err, setErr] = useState("");
	const [showForm, setShowForm] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		setErr("");
		setMsg("");
		try {
			db.collection("bakes")
				.add({
					bakeStoreUID: storeID,
					bakeStoreName: storeRec.storeName,
					availabilityStart: storeRec.availabilityStart,
					availabilityEnd: storeRec.availabilityEnd,
					isAvailable: true,
					bakeName: pdtName.current.value,
					bakeDesc: pdtDesc.current.value,
					bakeAllergens: allergens.current.value,
					bakePhotoURL: photoURL.current.value,
					bakeTags: tags,
					bakePriceAndQty: pricing,
					bakePriceArr: priceArr.sort(),
					itemPromo: pdtPromo.current.value,
				})
				.then(() => {
					setMsg("Successfully listed.");
				});
		} catch (error) {
			setErr("" + error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		setLoading(true);
		db.collection("stores")
			.doc(storeID)
			.get()
			.then((snapshot) => setStoreRec(snapshot.data()))
			.then(() => setLoading(false));
	}, []);

	return (
		<div>
			<Button
				variant="warning"
				className="mt-3"
				onClick={() => setShowForm(true)}
				disabled={showForm}
			>
				List New Product
			</Button>
			{showForm && (
				<>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mt-4" controlId="formPdtName">
							<Form.Label>Bake Product Name</Form.Label>
							<Form.Control type="text" placeholder="Enter name" ref={pdtName} required />
						</Form.Group>
						<Form.Group className="mt-4" controlId="formPdtDesc">
							<Form.Label>Bake Product Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter description"
								ref={pdtDesc}
								as="textarea"
								rows={3}
								required
							/>
							<Form.Text className="text-muted">
								Include a short description about this product.
							</Form.Text>
						</Form.Group>
						<Form.Group className="mt-4" controlId="formPdtImg">
							<Form.Label>Bake Product Image</Form.Label>
							<Form.Control type="text" placeholder="Enter image URL" ref={photoURL} />
							<Form.Text className="text-muted">Include URL to an image of your product.</Form.Text>
						</Form.Group>
						<Form.Group className="mt-4" controlId="formPdtAllergens">
							<Form.Label>Bake Product Allergens</Form.Label>
							<Form.Control type="text" placeholder="Enter allergens" ref={allergens} />
							<Form.Text className="text-muted">
								Optional. Include possible allergens used in the baking of this product.
							</Form.Text>
						</Form.Group>

						<AddPricingInfo updateMap={setPricing} updateArr={setPriceArr} />

						<Form.Group className="mt-4" controlId="formPdtPromo">
							<Form.Label>Promotions</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter promotions"
								ref={pdtPromo}
								as="textarea"
								rows={3}
							/>
							<Form.Text className="text-muted">
								Optional. Include any promotions you might have for this product.
							</Form.Text>
						</Form.Group>

						<AddTags updateArr={setTags} />

						<Button className="mt-4" variant="primary" type="submit" disabled={loading}>
							Add Product Listing
						</Button>
					</Form>
					{err && <Alert variant="danger">{err}</Alert>}
					{msg && <Alert variant="success">{msg}</Alert>}
					<Button className="mt-4  mb-4" variant="warning" onClick={() => setShowForm(false)}>
						Back
					</Button>
				</>
			)}
		</div>
	);
}
