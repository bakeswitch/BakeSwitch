import React from "react";
import { Card } from "react-bootstrap";
import styles from "./SellerProfile.module.css";
import UpdateString from "../helperComponents/UpdateString";

export default function SellerContact(props) {
	const sellerDoc = props.sellerDoc;
	const isOwnStore = props.isOwnStore;
	const storeRef = props.storeRef;

	return (
		<Card body className={styles.tabBox}>
			{/* Each contact method only shows if there is a value (for non-store owners) but will always show for the store owner */}
			<Card.Body>
				{(sellerDoc?.phoneNum || isOwnStore) && (
					<>
						<Card.Title>Phone contact</Card.Title>
						<Card.Text>{sellerDoc.phoneNum}</Card.Text>
						{isOwnStore && (
							<UpdateString item={sellerDoc.phoneNum} field="phoneNum" docRef={storeRef} />
						)}
					</>
				)}
				{(sellerDoc?.teleHandle || isOwnStore) && (
					<>
						<Card.Title>Telegram contact</Card.Title>
						<Card.Text>{sellerDoc.teleHandle}</Card.Text>
						{isOwnStore && (
							<UpdateString item={sellerDoc.teleHandle} field="teleHandle" docRef={storeRef} />
						)}
					</>
				)}
				{(sellerDoc?.email || isOwnStore) && (
					<>
						<Card.Title>Email address</Card.Title>
						<Card.Text>{sellerDoc.email}</Card.Text>
						{isOwnStore && <UpdateString item={sellerDoc.email} field="email" docRef={storeRef} />}
					</>
				)}
				{(sellerDoc?.instaLink || isOwnStore) && (
					<>
						<Card.Title>Instagram</Card.Title>
						{sellerDoc?.instaLink && (
							<a href={sellerDoc.instaLink}>
								<Card.Text>Visit my instagram page</Card.Text>
							</a>
						)}
						{isOwnStore && (
							<UpdateString item={sellerDoc.instaLink} field="instaLink" docRef={storeRef} />
						)}
					</>
				)}
				{(sellerDoc?.fbLink || isOwnStore) && (
					<>
						<Card.Title>Facebook</Card.Title>
						{sellerDoc?.fbLink && (
							<a href={sellerDoc.fbLink}>
								<Card.Text>Visit my facebook page</Card.Text>
							</a>
						)}
						{isOwnStore && (
							<UpdateString item={sellerDoc.fbLink} field="fbLink" docRef={storeRef} />
						)}
					</>
				)}
				{(sellerDoc?.websiteLink || isOwnStore) && (
					<>
						<Card.Title>Store website</Card.Title>
						{sellerDoc?.websiteLink && (
							<a href={sellerDoc.websiteLink}>
								<Card.Text>Visit my personal website</Card.Text>
							</a>
						)}
						{isOwnStore && (
							<UpdateString item={sellerDoc.websiteLink} field="websiteLink" docRef={storeRef} />
						)}
					</>
				)}
			</Card.Body>
		</Card>
	);
}
