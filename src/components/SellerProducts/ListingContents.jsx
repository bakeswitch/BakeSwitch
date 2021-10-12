import React from "react";
import PricingOptionsDisplay from "./PricingOptionsDisplay";
import UpdateString from "../helperComponents/UpdateString";
import UpdateArrMap from "../helperComponents/UpdateArrMap";

export default function ListingContents(props) {
	const bakeRec = props.bakeRec;
	const bakeRef = props.bakeRef;

	return (
		<div>
			<h6>Bake Description</h6>
			{/* <p>{bakeRec.bakeDesc}</p> */}
			<UpdateString item={bakeRec?.bakeDesc} field="bakeDesc" docRef={bakeRef} isTextArea={true} />
			<h6>Bake Tags</h6>
			<p>{bakeRec.bakeTags.toString()}</p>
			<UpdateArrMap item={bakeRec?.bakeTags} field="bakeTags" docRef={bakeRef} isArr={true} />
			<h6>Bake Allergens</h6>
			{/* <p>{bakeRec?.bakeAllergens ? bakeRec.bakeAllergens : "N.A."}</p> */}
			<UpdateString item={bakeRec?.bakeAllergens} field="bakeAllergens" docRef={bakeRef} />
			<h6>Bake Availability</h6>
			<p>{bakeRec?.isAvailable ? "Available" : "Not Available"}</p>
			{/* <h6>Sale Start Date</h6>
			<p>{bakeRec.availabilityStart}</p>
			<h6>Sale End Date</h6>
			<p>{bakeRec.availabilityEnd}</p> */}
			<h6>Pricing Options</h6>
			<PricingOptionsDisplay obj={bakeRec.bakePriceAndQty} />
			<UpdateArrMap
				item={bakeRec?.bakePriceAndQty}
				field="bakePriceAndQty"
				docRef={bakeRef}
				isArr={false}
			/>
			<h6>Product Promotion</h6>
			{/* <p>{bakeRec?.itemPromo ? bakeRec.itemPromo : "N.A."}</p> */}
			<UpdateString
				item={bakeRec?.itemPromo}
				field="itemPromo"
				docRef={bakeRef}
				isTextArea={true}
			/>
			<h6>Update Bake Picture URL</h6>
			<UpdateString item={bakeRec?.bakePhotoURL} field="bakePhotoURL" docRef={bakeRef} 
				formText=" 4 by 3 aspect ratio (ideally)" 
			/>
		</div>
	);
}
