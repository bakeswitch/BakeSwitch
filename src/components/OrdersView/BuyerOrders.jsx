import React from "react";
import { Card, Table } from "react-bootstrap";
import styles from "./OrdersView.module.css";

function TableRow(props) {
	const doc = props.order;
	const orderID = props.orderID;

	return (
		<tr>
			<td className={styles.ordersNum}>{doc.date}</td>
			<td className={styles.ordersNum}>{doc.storeName}</td>
			<td>{doc.orderBody}</td>
			<td className={styles.ordersNum}>{orderID}</td>
		</tr>
	);
}

export default function BuyerOrders(props) {
	const orderArr = props.orderArr;

	return (
		<Card className={styles.tableDetails}>
			<Card.Header as="h5">{props.title}</Card.Header>
			<Card.Body>
				<Table striped bordered hover responsive="xl">
					<thead>
						<tr>
							<th className={styles.ordersNum}>Order date</th>
							<th className={styles.ordersNum}>Baker</th>
							<th>Order details</th>
							<th className={styles.ordersNum}>Order id</th>
						</tr>
					</thead>
					<tbody>
						{orderArr.map((order) => (
							<TableRow order={order.orderRec} orderID={order.id} key={order.id} />
						))}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
}
