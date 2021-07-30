import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { db } from "../../config/firebase";

export default function AddOrder(props) {
	const storeID = props.storeID;

	const orderProducts = useRef();
	const amt = useRef();
	const custName = useRef();
	const custContact = useRef();
	const [transferMode, setTransferMode] = useState();
	const location = useRef();
	const custDateTime = useRef();
	const orderRemarks = useRef();

	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [showAddAnother, setShowAddAnother] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		if (!transferMode) {
			setLoading(false);
			return alert("Please choose a mode of transfer.");
		}

		try {
			db.collection("orders")
				.add({
					storeID: storeID,
					orderText: orderProducts.current.value,
					totalAmt: amt.current.value,
					buyerName: custName.current.value,
					buyerContact: custContact.current.value,
					modeOfTransfer: transferMode,
					location: location.current.value,
					transacDate: new Date(custDateTime.current.value).toLocaleDateString("en-ZA"),
					transacTime: new Date(custDateTime.current.value).toLocaleTimeString("en-GB", {
						hour: "2-digit",
						minute: "2-digit",
					}),
					orderRemarks: orderRemarks.current.value,
				})
				.then(() => {
					alert("Successfully added.");
				});
		} catch (error) {
			alert("" + error);
		} finally {
			setShowAddAnother(true);
			setLoading(false);
		}
	}

	return (
		<div>
			<Button
				variant="warning"
				className="mt-4 mb-2"
				onClick={() => setShowForm(true)}
				hidden={showForm}
			>
				Add Order
			</Button>
			{showForm && (
				<>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mt-4" controlId="formPdtOrdered">
							<Form.Label>Order Details</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter products ordered, quantity, and any other order information"
								as="textarea"
								rows={3}
								ref={orderProducts}
								required
							/>
						</Form.Group>

						<Form.Group className="mt-4" controlId="formAmt">
							<Form.Label>Total Amount ($)</Form.Label>
							<Form.Control
								type="number"
								step="0.05"
								placeholder="Enter amount ($)"
								ref={amt}
								required
							/>
						</Form.Group>

						<Form.Group className="mt-4" controlId="formMode">
							<Form.Label>Mode of Transfer</Form.Label>
							<Form.Check
								type="radio"
								name="mode"
								id="mode-collect"
								label="Collection"
								onClick={() => setTransferMode("collection")}
							/>
							<Form.Check
								type="radio"
								name="mode"
								id="mode-delivery"
								label="Delivery"
								onClick={() => setTransferMode("delivery")}
							/>
						</Form.Group>

						<Form.Group className="mt-4" controlId="formDateTime">
							<Form.Label>Transaction Date & Time</Form.Label>
							<Form.Control type="datetime-local" ref={custDateTime} required />
						</Form.Group>

						<Form.Group className="mt-4" controlId="formBuyerName">
							<Form.Label>Buyer Name</Form.Label>
							<Form.Control type="text" placeholder="Enter buyer name" ref={custName} required />
						</Form.Group>

						<Form.Group className="mt-4" controlId="formBuyerContact">
							<Form.Label>Buyer Contact Info</Form.Label>
							<Form.Control
								type="text"
								as="textarea"
								rows={2}
								placeholder="Enter buyer contact info"
								ref={custContact}
							/>
						</Form.Group>

						{transferMode === "delivery" && (
							<Form.Group className="mt-4" controlId="formBuyerAddress">
								<Form.Label>Buyer Address</Form.Label>
								<Form.Control type="text" placeholder="Enter buyer address" ref={location} />
							</Form.Group>
						)}

						{transferMode === "collection" && (
							<Form.Group className="mt-4" controlId="formBuyerMeetingLoc">
								<Form.Label>Buyer Meeting Location</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter buyer meeting location"
									ref={location}
								/>
							</Form.Group>
						)}

						<Form.Group className="mt-4" controlId="formOrderRemarks">
							<Form.Label>Remarks</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter remarks"
								ref={orderRemarks}
								as="textarea"
								rows={2}
							/>
							<Form.Text className="text-muted">Include any remarks for this order</Form.Text>
						</Form.Group>

						<Button className="mt-4" variant="primary" type="submit" disabled={loading}>
							Add Order
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
							Add Another Order
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
