import React from "react";
import styles from "./DisplayBakeCard.module.css";
import { Card } from "react-bootstrap";
import { orderPriceAndQtyArr } from "../../helperFunctions/handleDataFunctions";


//must wrap card in column
export function DisplayBakeCard(props) {
	const bakeID = props.bakeID;
	alert('runs here in dbc');
	const [bakeData, setBakeData] = useState();
	const [orderedPriceAndQtyArr, setOrderedPriceAndQtyArr] = useState([["default_price","default_qty"]]);
	const [isLoading, setIsLoading] = useState(false);

	const bakeRef = db.collection("bakes").doc(bakeID);
	const history = useHistory();
	
	function fillBakeData() {
		bakeRef.get()
			.then((snapshot) => {
				if (snapshot && snapshot.exists) {
					setBakeData(snapshot.data());
					// alert("bakeData set");
				} else {
					alert('snapshot doesnt exist');
				}
			}).catch((err) => alert("setBakeObj error: " + err));
	}

	function getRealTimeUpdates() {
		bakeRef.onSnapshot((snapshot) => {
			if (snapshot && snapshot.exists) {
				// alert(JSON.stringify(snapshot.data())); //runs here
				const orderedPnQArr = orderPriceAndQtyArr(snapshot.data());
				// alert(JSON.stringify(orderedPnQ)); //Doesnt run here
				setOrderedPriceAndQtyArr(orderedPnQArr);
			} else {
				alert("snapshot doesnt exist for realtime update");
			}
		})
	}
	
	useEffect(() => {
		try {
			setIsLoading(true);
			fillBakeData();
			getRealTimeUpdates();
		} finally {
			setIsLoading(false);
		}
		//use return clearnup function instead?
	},[bakeID]);
	
	if (!bakeData) { 
		return ErrorCard("no bake data") 
	}
	
	//pass in default values in case can't read fields
	const { bakeName 		= 'default_bake_name', 
			storeID  		= 'default_store_id',
			bakeDesc 		= 'default_bake_desc',
			bakePhotoURL 	= 'default_bake_photo' } = bakeData;
	
	function handleOnClick() {
		history.push(`/bake-product/${bakeID}`);
	}
	
	return !isLoading && ( 
		<BakeCard 
			key = {"displayBakeCard_" + bakeID}
			bakeID = {bakeID}
			handleOnClick = {handleOnClick}
			bakePhotoURL = {bakePhotoURL}
			bakeName = {bakeName}
			bakeDesc = {bakeDesc}
			orderedPriceAndQtyArr = {orderedPriceAndQtyArr}
			storeID = {storeID}
		/>
	);
}

export default function BakeCard(props) {
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
	)
}