import React from "react";
import { Card, Row, Col} from "react-bootstrap";
import styles from "./SellerProfile.module.css";
import UpdateString from "../helperComponents/UpdateString";

export default function SellerContact(props) {
	const { sellerDoc,
			isOwnStore,
			storeRef } = props;
	
	const { phoneNum,
			teleHandle,
			email,
			instaLink,
			fbLink,
			websiteLink } = sellerDoc;

	return (
		<Card body className={styles.tabBox}>
			{/* Each contact method only shows if there is a value (for non-store owners) but will always show for the store owner */}
			<Card.Body>
				{(phoneNum || isOwnStore) && (
					<>
						<Card.Title>Phone contact</Card.Title>
						<Card.Text>
							{isOwnStore 
								? <UpdateString item={phoneNum} field="phoneNum" docRef={storeRef} />
								: phoneNum
							}
						</Card.Text>
					</>
				)}
				{(teleHandle || isOwnStore) && (
					<>
						<Card.Title>Telegram contact</Card.Title>
						<Card.Text>
							{isOwnStore 
								? <UpdateString item={teleHandle} field="teleHandle" docRef={storeRef} />
								: teleHandle
							}
						</Card.Text>
					</>
				)}
				{(email || isOwnStore) && (
					<>
						<Card.Title>Email address</Card.Title>
						<Card.Text>
							{isOwnStore 
								? <UpdateString item={email} field="email" docRef={storeRef} />
								: email
							}
						</Card.Text>
					</>
				)}
				{(instaLink || isOwnStore) && (
					<>	
						<Card.Title>Instagram</Card.Title>
						<Card.Text>
							{isOwnStore 
								? <UpdateString 
									item={instaLink} 
									isLink={true}
									linkText="Visit instagram profile"
									field="instaLink" 
									docRef={storeRef} />
								: instaLink
							}
						</Card.Text>
					</>
				)}
				{(fbLink || isOwnStore) && (
					<>
						<Card.Title>Facebook</Card.Title>
						<Card.Text>
							{isOwnStore 
								? <UpdateString 
									item={fbLink} 
									isLink={true}
									linkText="Visit facebook profile"
									field="fbLink" 
									docRef={storeRef} />
								: fbLink
							}
						</Card.Text>
					</>
				)}
				{(websiteLink || isOwnStore) && (
					<>
						<Card.Title>Store website</Card.Title>
						<Card.Text>
							{isOwnStore 
								? <UpdateString 
									item={websiteLink} 
									isLink={true}
									linkText="Visit website"
									field="websiteLink" 
									docRef={storeRef} />
								: websiteLink
							}
						</Card.Text>
					</>
				)}
			</Card.Body>
		</Card>
	);
}
