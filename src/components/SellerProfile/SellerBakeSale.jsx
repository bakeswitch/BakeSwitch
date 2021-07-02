import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./SellerProfile.module.css";
import UpdateString from "../helperComponents/UpdateString";
import UpdateDate from "../helperComponents/UpdateDate";
import { CreateBakeSale, DeleteBakeSale } from "./CreateDeleteBakeSale";

export default function SellerBakeSale(props) {
	const sellerDoc = props.sellerDoc;
	const isOwnStore = props.isOwnStore;
	const storeRef = props.storeRef;

	if (sellerDoc?.bakeSaleName) {
		const today = new Date();
		const startDate = new Date(sellerDoc.availabilityStart);
		const endDate = new Date(sellerDoc.availabilityEnd);
		var saleStatus = startDate > today ? "Upcoming" : endDate < today ? "Ended" : "Ongoing";
	}

	return (
		<Card body className={styles.tabBox}>
			{sellerDoc?.bakeSaleName ? (
				<>
					<Card.Title className="mb-4">
						<div>
							<Button variant="info" size="sm" className="mb-3" disabled>
								{saleStatus}
							</Button>
						</div>
						{sellerDoc.bakeSaleName}
					</Card.Title>
					<Card.Text>
						<strong>Start</strong> : {sellerDoc.availabilityStart}
					</Card.Text>
					<Card.Text>
						<strong>End</strong> : {sellerDoc.availabilityEnd}
					</Card.Text>
					{isOwnStore && (
						<UpdateDate start="availabilityStart" end="availabilityEnd" docRef={storeRef} />
					)}
					<br />
					<Card.Title className="mb-3" as="h6">
						Description
					</Card.Title>
					<Card.Text>{sellerDoc.bakeSaleDesc}</Card.Text>
					{isOwnStore && (
						<UpdateString
							item={sellerDoc.bakeSaleDesc}
							field="bakeSaleDesc"
							docRef={storeRef}
							isTextArea={true}
						/>
					)}
					{(sellerDoc?.bakeSalePromo || isOwnStore) && (
						<>
							<Card.Title className="mb-3" as="h6">
								Promotions
							</Card.Title>
							<Card.Text>{sellerDoc.bakeSalePromo}</Card.Text>
							{isOwnStore && (
								<UpdateString
									item={sellerDoc.bakeSalePromo}
									field="bakeSalePromo"
									docRef={storeRef}
									isTextArea={true}
								/>
							)}
						</>
					)}
				</>
			) : (
				"No bake sale"
			)}

			{isOwnStore && !sellerDoc?.bakeSaleName && (
				<CreateBakeSale docRef={storeRef} buttonLabel="Create Bake Sale" />
			)}

			{isOwnStore && sellerDoc?.bakeSaleName && saleStatus === "Ended" && (
				<CreateBakeSale docRef={storeRef} buttonLabel="Create New Bake Sale" />
			)}
			{isOwnStore && sellerDoc?.bakeSaleName && saleStatus === "Ended" && (
				<div className="mt-3">
					<h6>OR</h6>
				</div>
			)}
			{isOwnStore && sellerDoc?.bakeSaleName && <DeleteBakeSale docRef={storeRef} />}
		</Card>
	);
}
