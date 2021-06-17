import React, { useRef } from "react";
import styles from "./SearchBox.module.css";
import { Form, InputGroup, Row , Col, Button } from "react-bootstrap"

export default function SearchBox() {
    const searchRef = useRef();

    return (
        <Form className={styles.form}>
            <Row className="mb-4">
                <Form.Group as={Col} md="6" controlId="formSearchBar">
                    <Form.Label className="d-flex align-items-left">search keywords / #tags</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" ref={searchRef} placeholder="search" />
                        <Button onClick={() => alert("update" + searchRef.current.value)}>Search</Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="ms-auto" as={Col} md="2" controlId="formSortBy">
                <Form.Label className="d-flex align-items-left">sort by</Form.Label>
                <Form.Control className="ms-auto" as="select" placeholder="-" defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>latest</option>
                    <option>price</option>
                    <option>popularity</option>
                </Form.Control>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} controlId="formBakeCategory">
                    <Form.Label className="d-flex align-items-left">bake category</Form.Label>
                    <Form.Control as="select" placeholder="-">
                        <option>Choose...</option>
                        <option>cookie</option>
                        <option>brownie</option>
                        <option>cake</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formBaker">
                    <Form.Label className="d-flex align-items-left">baker</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group xs="auto" as={Col} controlId="formDateStart">
                    <Form.Label className="d-flex align-items-left">from</Form.Label>
                    <Form.Control type="date"/>
                </Form.Group>

                <Form.Group xs="auto" as={Col} controlId="formDateEnd">
                    <Form.Label className="d-flex align-items-left">to</Form.Label>
                    <Form.Control type="date"/>
                </Form.Group>
            </Row>
        </Form>

    );
}

