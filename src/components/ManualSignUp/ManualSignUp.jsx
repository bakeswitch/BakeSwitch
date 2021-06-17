import React, { useState } from "react";
import styles from "./ManualSignUp.module.css";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { db } from "../../config/firebase";
import ProfileInfo from "./ProfileInfo";
import BasicStoreInfo from "../SellerForm/BasicStoreInfo";
import ContactInfo from "../SellerForm/ContactInfo";

const ManualSignUp = () => {
	const { signUp, logOut } = useAuth();
	const history = useHistory();

	const [signUpInfo, setSignUpInfo] = useState("");
	const [profileInfo, setProfileInfo] = useState("");
	const [basicStoreInfo, setBasicStoreInfo] = useState("");
	const [contactInfo, setContactInfo] = useState("");

	const [basicInfoDone, setBasicInfoDone] = useState(false);
	const [errors, setErrors] = useState("");
	const [loading, setLoading] = useState(false);
	const [yesSeller, setYesSeller] = useState(false);
	const [showSubmit, setShowSubmit] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setErrors("");

		//SIGN-UP
		try {
			setLoading(true);
			await signUp(signUpInfo.email, signUpInfo.password).then((userCredential) => {
				var user = userCredential.user;
				sendEmailVer(user); //SEND-EMAIL-VERIFICATION and LOG-OUT
				addUserToDatabase(user);
			});
		} catch (err) {
			const errorCode = err.code;
			switch (errorCode) {
				case "auth/email-already-in-use":
					setErrors("Account with this email already exists");
					break;
				case "auth/invalid-email":
					setErrors("Invalid email");
					break;
				case "auth/weak-password":
					setErrors("Password is too weak");
					break;
				default:
					setErrors("Failed to create an account" + err.message);
			}
		} finally {
			setLoading(false);
		}
	}

	async function sendEmailVer(user) {
		try {
			logOut();
			await user.sendEmailVerification();
			history.push("/log-in");
			alert(
				"Email verification sent. Please check your inbox and verify your email to complete account creation."
			);
		} catch {
			setErrors("Failed to send email verification");
		}
	}

	async function addUserToDatabase(user) {
		const uid = user.uid;
		const userRef = db.collection("users").doc(uid);
		await userRef.set({
			email: user.email,
			photoURL: user?.photoURL,
			isManualSignUp: true,
			isSeller: false,
		});
		userRef.update({
			username: profileInfo.username,
			phoneNumber: profileInfo.phoneNumber,
		});
		if (yesSeller) {
			const storeRef = await db.collection("stores").add({
				userID: uid,
			});
			const storeID = storeRef.id;
			db.collection("stores").doc(storeID).update(basicStoreInfo);
			db.collection("stores").doc(storeID).update(contactInfo);
			userRef.update({
				isSeller: true,
				storeID: storeID,
			});
		}
	}

	return (
		<div className={styles.mainBox}>
			{errors && <Alert variant="danger">{errors}</Alert>}
			<ProfileInfo
				updateFunc={(obj1, obj2) => {
					setSignUpInfo(obj1);
					setProfileInfo(obj2);
				}}
			/>
			{signUpInfo && (
				<div className={styles.qnBox}>
					<h6>Do you want to register as a seller?</h6>
					<Button
						variant="outline-primary"
						onClick={() => {
							setYesSeller(true);
							setShowSubmit(false);
						}}
						className={styles.replyButtons}
					>
						Yes
					</Button>

					<Button
						variant="outline-secondary"
						onClick={() => {
							setShowSubmit(true);
							setYesSeller(false);
						}}
						className={styles.replyButtons}
					>
						No
					</Button>
				</div>
			)}

			{yesSeller && (
				<>
					<BasicStoreInfo
						updateFunc={(obj) => {
							setBasicStoreInfo(obj);
							setBasicInfoDone(true);
						}}
					/>
					<br />
					{basicInfoDone && (
						<ContactInfo
							updateFunc={(obj) => {
								setContactInfo(obj);
								setShowSubmit(true);
							}}
						/>
					)}
				</>
			)}

			{showSubmit && (
				<Button disabled={loading} className="mt-3 w-100" variant="warning" onClick={handleSubmit}>
					Submit
				</Button>
			)}
		</div>
	);
};

export default ManualSignUp;
