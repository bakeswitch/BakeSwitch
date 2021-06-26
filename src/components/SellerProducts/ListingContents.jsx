import React from "react";

export default function ListingContents(props) {
	const bakeRec = props.bakeRec;

	return (
		<div>
			<h6>Bake Description</h6>
			<p>{bakeRec.bakeDesc}</p>
			<h6>Bake Tags</h6>
			<p>{bakeRec.bakeTags.toString()}</p>
			<h6>Bake Allergens</h6>
			<p>{bakeRec?.bakeAllergens ? bakeRec.bakeAllergens : "N.A."}</p>
			<h6>Bake Availability</h6>
			<p>{bakeRec?.isAvailable ? "Available" : "Not Available"}</p>
			<h6>Sale Start Date</h6>
			<p>{bakeRec.availabilityStart}</p>
			<h6>Sale End Date</h6>
			<p>{bakeRec.availabilityEnd}</p>
			<h6>Pricing Options</h6>
			<p>{JSON.stringify(bakeRec.bakePriceAndQty)}</p>
			<h6>Product Promotion</h6>
			<p>{bakeRec?.itemPromo ? bakeRec.itemPromo : "N.A."}</p>
		</div>
	);
}
