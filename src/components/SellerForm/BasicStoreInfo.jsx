import React, { useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

export default function BasicStoreInfo(props) {
	const storeNameRef = useRef();
	const storeDescRef = useRef();
	const storeLogoRef = useRef();
	const [loading, setLoading] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		props.updateFunc({
			storeName: storeNameRef.current.value,
			storeDesc: storeDescRef.current.value,
			// storeLogo: storeLogoRef.current.value,
		});
		setLoading(false);
	}

	return (
		<Card>
			<Card.Header as="h4" className="my-3">
				Basic Store Information
			</Card.Header>
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formStoreName">
						<Form.Label>Name of Baking Store</Form.Label>
						<Form.Control type="text" placeholder="Enter store name" ref={storeNameRef} required />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formStoreDesc">
						<Form.Label>Store Description</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter store description"
							ref={storeDescRef}
							as="textarea"
							rows={5}
						/>
						<Form.Text className="text-muted">
							Include a short description about your baking store.
						</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formStoreLogo">
						<Form.Label>Store Logo</Form.Label>
						<Form.File id="storeLogo" />
						<Form.Text className="text-muted">
							Upload your store logo (only .svg, .jpg, or .png files accepted)
						</Form.Text>
					</Form.Group>
					<Button className="mt-3" variant="primary" type="submit" disabled={loading}>
						Next
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}
