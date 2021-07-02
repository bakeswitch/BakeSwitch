import React, { useState, useRef } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import styles from "./helperComponents.module.css";

// Takes in 3 compulsory props (item, field, docRef), 1 optional prop (isTextArea - for store description)
// This is only to be used for fields that are non-mandatory.
// To delete a field value, click update without typing anything in the input box
export default function UpdateString(props) {
	const item = props.item;
	const field = props.field;
	const docRef = props.docRef;

	const [updateItem, setUpdateItem] = useState(false);
	const [loading, setLoading] = useState(false);
	const newVal = useRef();

	function handleUpdate(event) {
		event.preventDefault;
		setLoading(true);
		setUpdateItem(false);
		try {
			docRef
				.update({ [field]: newVal.current.value })
				.then(() => alert("Successfully updated. Refresh the page to view changes."));
		} catch (err) {
			alert("" + err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<IconButton aria-label="edit details" onClick={() => setUpdateItem(!updateItem)}>
				{item ? <EditIcon /> : <AddIcon />}
			</IconButton>

			{updateItem && (
				<Form onSubmit={handleUpdate}>
					<Form.Group className={styles.editString}>
						<InputGroup className="mb-2">
							{props.isTextArea ? (
								<Form.Control
									type="text"
									placeholder="Type here"
									ref={newVal}
									as="textarea"
									rows={5}
								/>
							) : (
								<Form.Control type="text" placeholder="Type here" ref={newVal} />
							)}
							<Button disabled={loading} type="submit">
								Update
							</Button>
						</InputGroup>
					</Form.Group>
				</Form>
			)}
		</div>
	);
}
