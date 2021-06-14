import React, { useState } from "react";
import styles from "./Profile.module.css";
import { Image, Card, Button, Table, Alert } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import EditDetails from "./EditPhoneNum";

function BuyerProfile(props) {
	const [editNum, setEditNum] = useState(false);
	const [addNum, setAddNum] = useState(false);
	const [msg, setMsg] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const userRef = props.userRef;
	const userRec = props.userRec;

	function handlePhoneNumUpdate(newValue) {
		setAddNum(false);
		setEditNum(false);
		setErrorMsg("");
		setMsg("");
		try {
			userRef
				.update({ phoneNumber: newValue })
				.then(() => setMsg("Phone number successfully updated."));
		} catch (err) {
			setErrorMsg("" + err);
		}
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
				{errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
				{msg && <Alert variant="success">{msg}</Alert>}
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
		</>
	);
}

export default BuyerProfile;
