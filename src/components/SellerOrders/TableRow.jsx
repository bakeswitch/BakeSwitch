import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./SellerOrders.module.css";
import OrderContents from "./OrderContents";
import { db } from "../../config/firebase";

export default function TableRow(props) {
	const doc = props.order;
	const orderID = props.orderID;

	const [showDetails, setShowDetails] = useState(false);
	const [confDelete, setConfDelete] = useState(false);
	const handleClose = () => setShowDetails(false);

	function handleDelete() {
		db.collection("orders")
			.doc(orderID)
			.delete()
			.then(() => {
				setShowDetails(false);
				alert("Order successfully deleted");
			})
			.catch((error) => {
				alert("Unsuccessful. Order not deleted. " + error);
			});
	}

	return (
		<>
			<tr onClick={() => setShowDetails(true)}>
				<td className={styles.ordersNum}>
					<ul className={styles.contentList}>
						<li>{new Date(doc.transacDate).toLocaleDateString("en-GB")}</li>
						<li>
							<strong>{doc.transacTime}</strong>
						</li>
					</ul>
				</td>
				<td>
					<ul className={styles.contentList}>
						<li>
							<h6>Total: ${doc.totalAmt}</h6>
						</li>
						<li>{doc.orderText}</li>
					</ul>
				</td>
				<td className={styles.ordersNum}>
					<ul className={styles.contentList}>
						<li>
							<h6>{doc.buyerName}</h6>
						</li>
						<li>{doc.buyerContact}</li>
					</ul>
				</td>
				<td className={styles.ordersNum}>{doc.location}</td>
				<td className={styles.ordersNum}>{doc.orderRemarks}</td>
			</tr>
			<Modal show={showDetails} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>
						{new Date(doc.transacDate).toLocaleDateString("en-GB") +
							", " +
							doc.transacTime +
							", " +
							doc.modeOfTransfer}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<OrderContents orderRec={doc} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" size="sm" onClick={() => setConfDelete(true)}>
						Delete order
					</Button>
					<Button variant="secondary" size="sm" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
				<Modal.Body>
					{confDelete && (
						<div>
							<h6>Are you sure you want to permanently delete this order?</h6>
							<Button
								variant="outline-primary"
								size="sm"
								onClick={() => setConfDelete(false)}
								className={styles.delConfButton}
							>
								No
							</Button>
							<Button
								variant="outline-danger"
								size="sm"
								onClick={handleDelete}
								className={styles.delConfButton}
							>
								Yes
							</Button>
						</div>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
}
