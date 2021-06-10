import React from "react";
import styles from "./BuyerProfile.module.css";
import { Card, Table } from "react-bootstrap";

export default function BuyerOrders() {
	return (
		<Card className={styles.tableDetails}>
			<Card.Header as="h5">My Orders</Card.Header>
			<Card.Body>
				<Table striped bordered hover>
					<thead>
						<th className={styles.ordersNum}>Order ID</th>
						<th className={styles.ordersNum}>Order date</th>
						<th>Order details</th>
					</thead>
					<tbody>
						<tr>
							<td className={styles.ordersNum}>1</td>
							<td className={styles.ordersNum}></td>
							<td></td>
						</tr>
						<tr>
							<td className={styles.ordersNum}>2</td>
							<td className={styles.ordersNum}></td>
							<td></td>
						</tr>
						<tr>
							<td className={styles.ordersNum}>3</td>
							<td className={styles.ordersNum}></td>
							<td></td>
						</tr>
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
}
