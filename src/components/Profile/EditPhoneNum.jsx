import React, { useRef } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import styles from "./Profile.module.css";

export default function EditPhoneNum(props) {
	const phoneRef = useRef();

	return (
		<Form.Group className={styles.editDetails}>
			<InputGroup className="mb-2">
				<InputGroup.Prepend>
					<InputGroup.Text>+65</InputGroup.Text>
				</InputGroup.Prepend>
				<Form.Control type="text" placeholder="Enter your phone number" ref={phoneRef} required />
				<Button onClick={() => props.update(phoneRef.current.value)}>{props.action}</Button>
			</InputGroup>
		</Form.Group>
	);
}
