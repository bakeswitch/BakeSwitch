import React, { useState } from "react";
import styles from "./SearchBox.module.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import { globalTagList } from "../../helperFunctions/handleTagsFunctions";
import { db } from "../../config/firebase";

export default function SearchBox(props) {
	const [tag, setTag] = useState("");
	const [storeName, setStoreName] = useState("");
	const [searchArr, setSearchArr] = useState([]);

	const { setSearchTag, setIsDefault, setStoreIDArr } = props;

	function handleSubmit(e) {
		e.preventDefault();
		tag != "" ? setSearchTag(tag) : setSearchTag(false);
		if (storeName != "") {
			db.collection("stores")
				.where("storeName", ">=", storeName)
				.where("storeName", "<=", storeName + "\uf8ff")
				.get()
				.then((querySnapshot) =>
					querySnapshot.forEach((doc) => {
						searchArr.push(doc.id);
					})
				)
				.then(() => setStoreIDArr(searchArr))
				.then(() => setSearchArr([]))
				.then(() => setIsDefault(false));
		} else {
			setStoreIDArr([]);
			setIsDefault(false);
		}
	}

	return (
		<Form className={styles.form} onSubmit={handleSubmit}>
			<Row className="mb-4">
				<Form.Group as={Col} controlId="formBakeCategory">
					<Form.Label className="d-flex align-items-left">bake category</Form.Label>
					<Form.Control
						as="select"
						placeholder="Choose tag"
						onChange={(e) => setTag(e.target.value)}
					>
						<option value="">-select tag-</option>
						{globalTagList.map((tag, index) => (
							<option value={tag} key={index}>
								{tag}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				<Form.Group as={Col} controlId="formBaker">
					<Form.Label className="d-flex align-items-left">baker</Form.Label>
					<Form.Control
						type="text"
						placeholder="enter store name"
						onChange={(e) => setStoreName(e.target.value)}
					/>
				</Form.Group>

				{/* <Form.Group xs="auto" as={Col} controlId="formDateStart">
                    <Form.Label className="d-flex align-items-left">from</Form.Label>
                    <Form.Control type="date" readOnly/>
                </Form.Group>

                <Form.Group xs="auto" as={Col} controlId="formDateEnd">
                    <Form.Label className="d-flex align-items-left">to</Form.Label>
                    <Form.Control type="date" readOnly />
                </Form.Group> */}
				<Form.Group as={Col} className="d-grid" md="2">
					<Form.Label className="d-flex align-items-left" style={{ visibility: "hidden" }}>
						notSeenText
					</Form.Label>
					<Button
						type="submit"
						xs="auto"
						style={{ display: "block", width: "auto" }}
						className={styles.submitButton}
					>
						Search
					</Button>
				</Form.Group>
			</Row>

			{/* <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="formSearchBar">
                    <Form.Label className="d-flex align-items-left">display search summary</Form.Label>
                    <InputGroup>
                        <Form.Control 
                            type="text" 
                            ref={searchRef} 
                            placeholder="search" 
                            value={searchText}
                            onChange = {e => setSearchText(e.target.value)}
                            readOnly/>
                        
                    </InputGroup>
                </Form.Group>

                <Form.Group className="ms-auto" as={Col} md="2" controlId="formSortBy">
                <Form.Label className="d-flex align-items-left">sort by</Form.Label>
                <Form.Control className="ms-auto" as="select" placeholder="-" defaultValue="Choose..." readOnly>
                    <option>Choose...</option>
                    <option>latest</option>
                    <option>price</option>
                    <option>popularity</option>
                </Form.Control>
                </Form.Group>
            </Row> */}
		</Form>
	);
}
