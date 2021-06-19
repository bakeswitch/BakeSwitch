import React, { useState, useRef } from "react";
import { Button, Alert, Form, InputGroup } from "react-bootstrap";
import styles from "./SellerProfile.module.css";

function CreateBakeSale(props) {
	const docRef = props.docRef;

	const saleName = useRef();
	const startDate = useRef();
	const endDate = useRef();
	const saleDesc = useRef();
	const salePromo = useRef();

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
			docRef
				.update({
					bakeSaleName: saleName.current.value,
					availabilityStart: startDate.current.value,
					availabilityEnd: endDate.current.value,
					bakeSaleDesc: saleDesc.current.value,
					bakeSalePromo: salePromo.current.value,
				})
				.then(() => {
					setMsg("Successfully created. Please refresh the page to view.");
				});
		} catch (error) {
			setErr("" + error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<Button
				variant="warning"
				className="mt-3"
				onClick={() => setShowForm(true)}
				disabled={showForm}
			>
				{props.buttonLabel}
			</Button>
			{err && <Alert variant="danger">{err}</Alert>}
			{msg && <Alert variant="success">{msg}</Alert>}
			{showForm && (
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mt-4" controlId="formSaleName">
						<Form.Label>Bake Sale Title</Form.Label>
						<Form.Control type="text" placeholder="Enter title" ref={saleName} required />
						<Form.Text className="text-muted">Include a title/name for your bake sale.</Form.Text>
					</Form.Group>
					<Form.Group>
						<InputGroup className="mt-3">
							<Form.Group>
								<Form.Label>From</Form.Label>
								<Form.Control type="date" ref={startDate} required />
							</Form.Group>
							<Form.Group>
								<Form.Label>To</Form.Label>
								<Form.Control type="date" ref={endDate} required />
							</Form.Group>
						</InputGroup>
						<Form.Text className="text-muted">
							Include the start and end dates for your bake sale.
						</Form.Text>
					</Form.Group>
					<Form.Group className="mt-4" controlId="formSaleDesc">
						<Form.Label>Bake Sale Description</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter description"
							ref={saleDesc}
							as="textarea"
							rows={5}
							required
						/>
						<Form.Text className="text-muted">
							Include a short description about this bake sale.
						</Form.Text>
					</Form.Group>
					<Form.Group className="mt-4" controlId="formSalePromo">
						<Form.Label>Bake Sale Promotions</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter promotions"
							ref={salePromo}
							as="textarea"
							rows={5}
						/>
						<Form.Text className="text-muted">
							Optional. Include any promotions you might have for this bake sale.
						</Form.Text>
					</Form.Group>
					<Button className="mt-4" variant="primary" type="submit" disabled={loading}>
						Create
					</Button>
				</Form>
			)}
		</div>
	);
}

function DeleteBakeSale(props) {
	const docRef = props.docRef;
	const [confirmDel, setConfirmDel] = useState(false);

	function handleDelete() {
		try {
			docRef
				.update({
					bakeSaleName: null,
					availabilityStart: null,
					availabilityEnd: null,
					bakeSaleDesc: null,
					bakeSalePromo: null,
				})
				.then(() => {
					alert("Successfully deleted. Please refresh the page to view changes.");
				});
		} catch (error) {
			alert("Unable to delete. " + error);
		} finally {
			setConfirmDel(false);
		}
	}

	return (
		<div>
			{!confirmDel && (
				<Button variant="danger" className="mt-3" onClick={() => setConfirmDel(true)} size="sm">
					Delete Bake Sale
				</Button>
			)}
			{confirmDel && (
				<div>
					<h6>Are you sure you want to delete this bake sale?</h6>
					<Button
						variant="outline-primary"
						onClick={() => setConfirmDel(false)}
						className={styles.delConfButton}
						size="sm"
					>
						No
					</Button>
					<Button
						variant="outline-danger"
						onClick={handleDelete}
						className={styles.delConfButton}
						size="sm"
					>
						Yes
					</Button>
				</div>
			)}
		</div>
	);
}

export { CreateBakeSale, DeleteBakeSale };
