import React from "react";
import styles from "./BakeCard.module.css";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";



export default function BakeCard(props) {
	const {
		bakeID = "defaultBakeID",
		// handleOnClick = () => alert("defaultHandleOnClick"),
		bakePhotoURL = "defaultURL",
		bakeName = "defaultBakeName",
		bakeDesc = "defaultBakeDescription",
		orderedPriceAndQtyArr = [["defaultPrice", "defaultQty"]],
		storeID = "defaultStoreID",
		storeName="defaultStoreName",
		isAvailable="defaultIsAvailable",
	} = props;
	const history = useHistory();
	
	function handleClickBake() {
		history.push(`/bake-product/${bakeID}`);
	}

	function handleClickStore() {
		history.push(`/bakerProfile/${storeID}`);
	}	
	
	return (
		<Card key={"card_" + bakeID} className={styles.card}>
			<Card.Img key={"img_" + bakeID}
				className={styles.cardImg}
				variant="top"
				src={bakePhotoURL}
				onClick={handleClickBake}
			/>
			<Card.Body key={"body_" + bakeID} className={styles.cardBody} style={{backgroundColor: isAvailable?"": "rgba(255, 242, 242, 0.932)"}}>
				<Card.Title 
					key={"title_" + bakeID} 
					className={styles.max2Lines}
					onClick={handleClickBake}>
						{bakeName}
				</Card.Title>
				<Card.Text key={"desc_" + bakeID} className={styles.max3Lines}>
						{bakeDesc}
				</Card.Text>
				<Card.Text key={"footer_" + bakeID} className={styles.cardFooter}>
					<span className={styles.max1Line}>from S${orderedPriceAndQtyArr[0][0]} onwards</span>
					<Card.Link 
						className={styles.max1Line} 
						key={"store_" + bakeID}
						onClick = {handleClickStore}>
						by {storeName}
					</Card.Link>
				</Card.Text>
			</Card.Body>
		</Card>
	)
}