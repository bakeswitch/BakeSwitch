import React, { useState, useRef } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import styles from "./helperComponents.module.css";

/* 
Reformated UpdateString helper function to display field as well.
Important! => Requires additional text (conditional rendering) for non-sellers to view

Example implementation:
	{isOwnStore 
		? <UpdateString
			item={X}
			field="X"
			docRef={storeRef}
			isTextArea={true}
		/>
		: X
	}
*/


// Takes in 3 compulsory props (item, field, docRef), 1 optional prop (isTextArea - for store description)
// another 1 optional prop (formText) which is footer for form field
// This is only to be used for fields that are non-mandatory.
// To delete a field value, click update without typing anything in the input box
export default function UpdateString(props) {
	const { item, //actual string
			field, //field of document in firestore
			docRef, 
			formText,
			isLink = false,
			linkText,
			showValue = true,
			isTextArea,
			} = props;

	const [updateItem, setUpdateItem] = useState(false);
	const [loading, setLoading] = useState(false);
	const formFieldRef = useRef();

	function handleClickFormField(e) {
		e.target.select();
	}

	function handleUpdate(event) {
		event.preventDefault;
		setLoading(true);
		setUpdateItem(false);
		try {
			docRef.update({ [field]: formFieldRef.current.value }).then(() => alert("Successfully updated."));
		} catch (err) {
			alert("" + err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
		<Row>
			{showValue && (
				<Col>
					{isLink && item
						? <a href={item}>{linkText}</a>
						: item
					}
				</Col>
			)}
			<Col className="ms-auto" xs="auto">
				<IconButton className="p-0" aria-label="edit details" 
					onClick={() => {
						// formFieldRef.current.select();
						setUpdateItem(!updateItem);
					}}
				>
					{item ? <EditIcon /> : <AddIcon />}
				</IconButton>
			</Col>
		</Row>

			{updateItem && (
				<Form onSubmit={handleUpdate} className="mt-2">
					<Form.Group className={styles.editString}>
						<InputGroup 
							// className="mb-2"
						>
							{isTextArea 
								? (
									<Form.Control
										type="text"
										placeholder="Type here"
										defaultValue={item}
										ref={formFieldRef}
										as={isTextArea? "textarea" : ""}
										onClick={handleClickFormField}
										rows={5}
									/> ) 
								: (
									<Form.Control 
										type="text" 
										placeholder="Type here" 
										defaultValue={item}
										onClick={handleClickFormField}
										ref={formFieldRef} />
								)}
							<Button disabled={loading} type="submit">
								update
							</Button>
						</InputGroup>
						<Form.Text>{formText}</Form.Text>
					</Form.Group>
				</Form>
			)}
		</>
	);
}
