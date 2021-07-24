import React, { useState } from "react";
import AddTags from "../SellerProducts/AddTags";
import AddPricingInfo from "../SellerProducts/AddPricingInfo";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "react-bootstrap";

// Takes in 4 compulsory props (item, field, docRef, isArr)
// isArr is a boolean value to conditionallly render the updating of either the product tags (true) or product pricing (false)
// To delete a field value, click update without typing anything in the input box
export default function UpdateArrMap(props) {
	const item = props.item;
	const field = props.field;
	const docRef = props.docRef;
	const isArr = props.isArr;

	const [tags, setTags] = useState([]);
	const [pricing, setPricing] = useState({});

	const [updateItem, setUpdateItem] = useState(false);
	const [loading, setLoading] = useState(false);

	function handleUpdate() {
		setLoading(true);
		setUpdateItem(false);
		try {
			docRef.update({ [field]: isArr ? tags : pricing }).then(() => alert("Successfully updated."));
		} catch (err) {
			alert("" + err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mb-3">
			<IconButton aria-label="edit details" onClick={() => setUpdateItem(!updateItem)}>
				{item ? <EditIcon /> : <AddIcon />}
			</IconButton>

			{updateItem && (
				<>
					{isArr ? <AddTags updateArr={setTags} /> : <AddPricingInfo updateMap={setPricing} />}
					<Button className="mt-1" disabled={loading} onClick={handleUpdate}>
						Update
					</Button>
				</>
			)}
		</div>
	);
}
