import React, { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
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

	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [showAddAnother, setShowAddAnother] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		try {
			db.collection("bakes")
				.add({
					storeID: storeID,
					storeName: storeRec.storeName,
					// availabilityStart: storeRec.availabilityStart,
					// availabilityEnd: storeRec.availabilityEnd,
					isAvailable: true,
					bakeName: pdtName.current.value,
					bakeDesc: pdtDesc.current.value,
					bakeAllergens: allergens.current.value,
					bakePhotoURL: photoURL.current.value,
					bakeTags: tags,
					bakePriceAndQty: pricing,
					itemPromo: pdtPromo.current.value,
				})
				.then(() => {
					alert("Successfully listed.");
				});
		} catch (error) {
			alert("" + error);
		} finally {
			setShowAddAnother(true);
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
				className="mt-4 mb-2"
				onClick={() => setShowForm(true)}
				hidden={showForm}
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

						<AddPricingInfo updateMap={setPricing} />

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
							List Product
						</Button>
					</Form>
					{showAddAnother && (
						<Button
							className="mt-4  mb-4 me-4"
							variant="secondary"
							size="sm"
							onClick={async () => {
								await setShowForm(false);
								setShowForm(true);
								window.scrollTo(0, 0);
							}}
						>
							Add Another Product
						</Button>
					)}
					<Button
						className="mt-4  mb-4"
						variant="warning"
						size="sm"
						onClick={() => window.location.reload()}
					>
						Done
					</Button>
					<hr style={{ width: "50%" }}></hr>
				</>
			)}
		</div>
	);
}
