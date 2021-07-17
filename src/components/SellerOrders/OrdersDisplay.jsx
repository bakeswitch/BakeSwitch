import React from "react";
import { Card, Table } from "react-bootstrap";
import styles from "./SellerOrders.module.css";
import TableRow from "./TableRow";

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
							<TableRow order={order.orderRec} orderID={order.id} key={order.id} />
						))}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
}
