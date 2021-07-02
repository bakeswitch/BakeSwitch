import React from "react";
import styles from "./Profile.module.css";
import { Image, Card, Button, Table } from "react-bootstrap";
import UpdateString from "../helperComponents/UpdateString";

function BuyerProfile(props) {
	const userRef = props.userRef;
	const userRec = props.userRec;

	return (
		<>
			<div className={styles.profileHeader}>
				{userRec?.photoURL && (
					<Image
						src={userRec.photoURL}
						alt="Profile picture"
						roundedCircle
						className={styles.profileImg}
					/>
				)}
				<h2>My Profile</h2>
			</div>

			<Card className={styles.tableDetails}>
				<Card.Header as="h5">Account Details</Card.Header>
				<Card.Body>
					<Table borderless hover responsive>
						<tbody>
							<tr>
								<td>
									<b>Username</b>
								</td>
								<td>{userRec.username}</td>
							</tr>
							<tr>
								<td>
									<b>Email</b>
								</td>
								<td>{userRec.email}</td>
							</tr>
							<tr>
								<td>
									<b>Phone number</b>
								</td>
								<td>
									{userRec.phoneNumber}
									<UpdateString item={userRec?.phoneNumber} field="phoneNumber" docRef={userRef} />
								</td>
							</tr>
						</tbody>
					</Table>
					{userRec?.password && (
						<Button href="/forgot-password" variant="secondary">
							Change password
						</Button>
					)}
				</Card.Body>
			</Card>
		</>
	);
}

export default BuyerProfile;
