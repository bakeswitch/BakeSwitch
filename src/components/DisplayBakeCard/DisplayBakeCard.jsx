import React from "react";
import styles from "./DisplayBakeCard.module.css";
import { Row, Col, Card } from "react-bootstrap";

// -- example call -- 
// <DisplayBakeCard 
    // 	bakeID = {bakeID}
    // 	handleOnClick = {handleOnClick}
    // 	bakePhotoURL = {bakePhotoURL}
    // 	bakeName = {bakeName}
    // 	bakeDesc = {bakeDesc}
    // 	orderedPriceAndQtyArr = {orderedPriceAndQtyArr}
    // 	storeID = {storeID}
// />
export default function DisplayBakeCard(props) {
	return (
	<Col>
		<Card className={styles.card} onClick={props.handleOnClick}>
			<Card.Img
				className={styles.cardImg}
				variant="top"
				src={props.bakePhotoURL}
			/>
			<Card.Body className={styles.cardBody}>
				<Card.Title className={styles.maxLines}>{props.bakeName}</Card.Title>
				<Card.Text>
					<p className={styles.maxLines}>
						{props.bakeDesc}
					</p>
				</Card.Text>
				<Card.Text className={styles.cardFooter}>
					<p>
						from S${props.orderedPriceAndQtyArr[0][0]} dollars onwards
						<br />
						by <Card.Link>{props.storeID}</Card.Link>
					</p>
				</Card.Text>
			</Card.Body>
		</Card>
	</Col>
	)
}