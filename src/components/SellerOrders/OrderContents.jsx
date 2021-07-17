import React from "react";

export default function OrderContents(props) {
	const orderRec = props.orderRec;

	return (
		<div>
			<h6>Order Text</h6>
			<p>{orderRec.orderText}</p>
			<h6>Total Amount</h6>
			<p>${orderRec.totalAmt}</p>
			<h6>Buyer Name</h6>
			<p>{orderRec.buyerName}</p>
			<h6>Buyer Contact Info</h6>
			<p>{orderRec?.buyerContact ? orderRec.buyerContact : "—"}</p>
			<h6>
				{orderRec.modeOfTransfer == "collection" ? "Collection Location" : "Delivery Location"}
			</h6>
			<p>{orderRec?.location ? orderRec.location : "—"}</p>
			<h6>Order Remarks</h6>
			<p>{orderRec?.orderRemarks ? orderRec.orderRemarks : "—"}</p>
		</div>
	);
}
