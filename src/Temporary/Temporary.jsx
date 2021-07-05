import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { setupBakeDoc, setupStoreDoc } from "./setupFireBase";

export default function Temporary() {

    return (
        <div>
            <h1>temp page for running js code</h1>
            <ButtonGroup >
                <Button variant="primary" className="me-2" onClick={() => setupBakeDoc()}>Update BakeDoc</Button>
                <Button variant="secondary" className="me-2 sucess" onClick={() => setupStoreDoc()}>Update StoreDoc</Button>
            </ButtonGroup>
        </div>
    )
}