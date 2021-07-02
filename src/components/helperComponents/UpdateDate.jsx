import React, { useState, useRef } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import styles from "./helperComponents.module.css";

// Takes in 3 compulsory props (start, end, docRef)
// Both start and end dates are compulsory fields to fill in
export default function UpdateDate(props) {
	const startField = props.start;
	const endField = props.end;
	const docRef = props.docRef;

	const [updateDate, setUpdateDate] = useState(false);
	const [loading, setLoading] = useState(false);
	const newStart = useRef();
	const newEnd = useRef();

	function handleUpdate(event) {
		event.preventDefault;
		setLoading(true);
		try {
			docRef
				.update({ [startField]: newStart.current.value, [endField]: newEnd.current.value })
				.then(() => alert("Successfully updated."));
		} catch (err) {
			alert("" + err);
		} finally {
			setLoading(false);
			setUpdateDate(false);
		}
	}

	return (
		<div>
			<Button
				variant="outline-warning"
				onClick={() => setUpdateDate(!updateDate)}
				disabled={loading}
				size="sm"
			>
				Edit dates
			</Button>

			{updateDate && (
				<Form onSubmit={handleUpdate}>
					<Form.Group className={styles.editString}>
						<InputGroup className="mb-2">
							<Form.Group>
								<Form.Label>From</Form.Label>
								<Form.Control type="date" ref={newStart} required />
							</Form.Group>
							<Form.Group>
								<Form.Label>To</Form.Label>
								<Form.Control type="date" ref={newEnd} required />
							</Form.Group>
						</InputGroup>
						<Button disabled={loading} type="submit">
							Update dates
						</Button>
					</Form.Group>
				</Form>
			)}
		</div>
	);
}
