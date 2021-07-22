import React, { useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { db } from "../../config/firebase";
import styles from "./SellerProducts.module.css";

export default function MasterToggler(props) {
	const bakeIDArr = props.bakeIDArr;
	const [toggleAvailable, setToggleAvailable] = useState();
	const [confMasterToggle, setConfMasterToggle] = useState(false);

	function handleToggle() {
		try {
			bakeIDArr.map((bakeID) => {
				db.collection("bakes").doc(bakeID).update({ isAvailable: toggleAvailable });
			});
		} catch (error) {
			alert("Error. Unable to update product availability");
		} finally {
			setConfMasterToggle(false);
			alert("Successfully changed availability of all products.");
		}
	}

	return (
		<>
			<div className="mt-4  mb-4">
				<h6 style={{ display: "inline-block" }}>Product availability: </h6>
				<ButtonGroup className="ms-3">
					<Button
						variant="outline-success"
						size="sm"
						onClick={() => {
							setToggleAvailable(true);
							setConfMasterToggle(true);
						}}
					>
						Make all available
					</Button>
					<Button
						variant="outline-danger"
						size="sm"
						onClick={() => {
							setToggleAvailable(false);
							setConfMasterToggle(true);
						}}
					>
						Make all unavailable
					</Button>
				</ButtonGroup>
			</div>

			<Modal show={confMasterToggle} onHide={() => setConfMasterToggle(false)}>
				<Modal.Body>
					<div>
						<h5>
							Change availability of all products to{" "}
							<em>{toggleAvailable ? "available" : "unavailable"}</em>. Confirm?
						</h5>
						<Button
							variant="outline-primary"
							size="sm"
							onClick={handleToggle}
							className={styles.delConfButton}
						>
							Yes
						</Button>
						<Button
							variant="outline-danger"
							size="sm"
							onClick={() => setConfMasterToggle(false)}
							className={styles.delConfButton}
						>
							No
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
