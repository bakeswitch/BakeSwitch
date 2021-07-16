import React from "react";
import { Card, Table } from "react-bootstrap";
import styles from "./SellerOrders.module.css";

function TableRow(props) {
	const doc = props.order;

	return (
		<tr>
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
	);
}

export default function OrdersDisplay(props) {
	const orderArr = props.orderArr;

	return (
		<Card className={styles.tableDetails}>
			<Card.Header as="h5">{props.title}</Card.Header>
			<Card.Body>
				<Table striped bordered hover responsive="xl">
					<thead>
						<tr>
							<th className={styles.ordersNum}>Date</th>
							<th>Order details</th>
							<th className={styles.ordersNum}>Buyer details</th>
							<th className={styles.ordersNum}>Location</th>
							<th className={styles.ordersNum}>Remarks</th>
						</tr>
					</thead>
					<tbody>
						{orderArr.map((order) => (
							<TableRow order={order.orderRec} key={order.id} />
						))}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
}
