import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import 	{ setupBakeDoc, 
		setupStoreDoc, 
		setupUserDoc, 
		setupUserOrderDoc, 
		addOneUserOrder, delOneUserOrder } from "./setupFireBase";

export default function Temporary() {
	return (
		<div>
			<h1>temp page for running js code</h1>
			<ButtonGroup>
				<Button variant="primary" className="me-2" onClick={() => setupBakeDoc()}>
					Update BakeDoc
				</Button>
				<Button variant="secondary" className="me-2 sucess" onClick={() => setupStoreDoc()}>
					Update StoreDoc
				</Button>
				<Button variant="success" className="me-2 sucess" onClick={() => setupUserDoc()}>
					Update UserDoc
				</Button>
				<Button variant="success" className="me-2 sucess" onClick={() => setupUserOrderDoc()}>
					Update UserOrderDoc
				</Button>
				<Button variant="danger" className="me-2 sucess" onClick={() => addOneUserOrder()}>
					Add One User Order
				</Button>
				<Button variant="danger" className="me-2 sucess" onClick={() => delOneUserOrder()}>
					Del One User Order
				</Button>
			</ButtonGroup>
		</div>
	);
}
