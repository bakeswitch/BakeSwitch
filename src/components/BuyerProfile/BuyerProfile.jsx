import React, { useState } from "react";
import styles from "./BuyerProfile.module.css";
import { Image, Card, Button, Table } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import EditDetails from "./EditDetails";
import BuyerOrders from "./BuyerOrders";

function BuyerProfile() {
	const { currentUser } = useAuth();
	// Get current user id to identify document in database
	const uid = currentUser.uid;
	const userRef = db.collection("users").doc(uid);
	const [editNum, setEditNum] = useState(false);
	const [addNum, setAddNum] = useState(false);

	// Get user document from database
	const [userRec, setUserRec] = useState({});
	// Retrieve data from document as a document snapshot. Store in userRec variable.
	userRef.get().then((snapshot) => setUserRec(snapshot.data()));

	function handlePhoneNumUpdate(newValue) {
		setAddNum(false);
		setEditNum(false);
		userRef
			.update({ phoneNumber: newValue })
			.then(() => alert("Phone number successfully updated"));
	}

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
									<IconButton aria-label="edit detail">
										{userRec?.phoneNumber ? (
											<EditIcon onClick={() => setEditNum(!editNum)} />
										) : (
											<AddIcon onClick={() => setAddNum(!addNum)} />
										)}
									</IconButton>
								</td>
							</tr>
						</tbody>
					</Table>
					{editNum && <EditDetails action="Edit phone number" update={handlePhoneNumUpdate} />}
					{addNum && <EditDetails action="Add phone number" update={handlePhoneNumUpdate} />}
					{userRec?.password && (
						<Button href="/forgot-password" variant="secondary">
							Change password
						</Button>
					)}
				</Card.Body>
			</Card>
			<BuyerOrders />
		</>
	);
}

export default BuyerProfile;
