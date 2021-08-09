import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./SellerProfile.module.css";
import UpdateString from "../helperComponents/UpdateString";
import UpdateDate from "../helperComponents/UpdateDate";
import { CreateBakeSale, DeleteBakeSale } from "./CreateDeleteBakeSale";

export default function SellerBakeSale(props) {
	const { sellerDoc,
			isOwnStore,
			storeRef } = props;
	const { availabilityStart,
			availabilityEnd,
			bakeSaleDesc,
			bakeSaleName,
			bakeSalePromo } = sellerDoc 

	if (sellerDoc?.bakeSaleName) {
		const today = new Date();
		const startDate = new Date(availabilityStart);
		const endDate = new Date(availabilityEnd);
		var saleStatus = startDate > today ? "Upcoming" : endDate < today ? "Ended" : "Ongoing";
	}

	return (
		<Card body className={styles.tabBox}>
			{bakeSaleName ? (
				<>
					<Card.Title className="mb-4">
						<div>
							<Button variant="info" size="sm" className="mb-3" disabled>
								{saleStatus}
							</Button>
						</div>
						{bakeSaleName}
					</Card.Title>
					<Card.Text>
						<strong>Start</strong> : {availabilityStart}
					</Card.Text>
					<Card.Text>
						<strong>End</strong> : {availabilityEnd}
					</Card.Text>
					{isOwnStore && (
						<UpdateDate start="availabilityStart" end="availabilityEnd" docRef={storeRef} />
					)}
					<br />
					<Card.Title className="mb-3" as="h6">
						Description
					</Card.Title>
					<Card.Text>
						{isOwnStore 
							? <UpdateString
								item={bakeSaleDesc}
								field="bakeSaleDesc"
								docRef={storeRef}
								isTextArea={true}
							/>
							: bakeSaleDesc
						}
					</Card.Text>
					{(bakeSalePromo || isOwnStore) && (
						<>
							<Card.Title className="mb-3" as="h6">
								Promotions
							</Card.Title>
							<Card.Text>
								{isOwnStore 
									? <UpdateString
										item={bakeSalePromo}
										field="bakeSalePromo"
										docRef={storeRef}
										isTextArea={true}
									/>
									: bakeSalePromo
								}
							</Card.Text>
						</>
					)}
				</>
			) : (
				"No bake sale"
			)}

			{isOwnStore && !bakeSaleName && (
				<CreateBakeSale docRef={storeRef} buttonLabel="Create Bake Sale" />
			)}

			{isOwnStore && bakeSaleName && saleStatus === "Ended" && (
				<CreateBakeSale docRef={storeRef} buttonLabel="Create New Bake Sale" />
			)}
			{isOwnStore && bakeSaleName && saleStatus === "Ended" && (
				<div className="mt-3">
					<h6>OR</h6>
				</div>
			)}
			{isOwnStore && bakeSaleName && <DeleteBakeSale docRef={storeRef} />}
		</Card>
	);
}
