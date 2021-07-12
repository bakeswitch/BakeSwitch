import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { setupBakeDoc, setupStoreDoc, setupOrdersDoc } from "./setupFireBase";

export default function Temporary() {
	return (
		<div>
			<h1>temp page for running js code</h1>
			<ButtonGroup>
				<Button className="me-2" onClick={() => setupBakeDoc()}>
					Update BakeDoc
				</Button>
				<Button className="me-2 sucess" onClick={() => setupStoreDoc()}>
					Update StoreDoc
				</Button>
				<Button className="me-2" onClick={() => setupOrdersDoc()}>
					Add OrdersDoc
				</Button>
			</ButtonGroup>
		</div>
	);
}
