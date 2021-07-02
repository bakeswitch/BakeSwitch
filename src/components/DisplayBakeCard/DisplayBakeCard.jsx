import React from "react";
import styles from "./DisplayBakeCard.module.css";
import { Row, Col, Card } from "react-bootstrap";

export default function DisplayBakeCard(props) {
	const {
		bakeID = "defaultBakeID",
		handleOnClick = () => alert("defaultHandleOnClick"),
		bakePhotoURL = "defaultURL",
		bakeName = "defaultBakeName",
		bakeDesc = "defaultBakeDescription",
		orderedPriceAndQtyArr = [["defaultPrice", "defaultQty"]],
		storeID = "defaultStoreID"
	} = props;

	return (
		<Col key={"col_" + bakeID}>
			<Card key={"card_" + bakeID} className={styles.card} onClick={handleOnClick}>
				<Card.Img key={"img_" + bakeID}
					className={styles.cardImg}
					variant="top"
					src={bakePhotoURL}
				/>
				<Card.Body key={"body_" + bakeID} className={styles.cardBody}>
					<Card.Title key={"title_" + bakeID} className={styles.max2Lines}>{bakeName}</Card.Title>
					<Card.Text key={"desc_" + bakeID} className={styles.max3Lines}>
							{bakeDesc}
					</Card.Text>
					<Card.Text key={"footer_" + bakeID} className={styles.cardFooter}>
						from S${orderedPriceAndQtyArr[0][0]} dollars onwards
						<br />
						by <Card.Link key={"store_" + bakeID}>{storeID}</Card.Link>
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	)
}