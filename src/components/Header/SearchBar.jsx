import React from "react";
import { Form, FormControl } from "react-bootstrap";

export default function SearchBar() {
	return (
		<Form inline className="ms-auto">
			<FormControl type="text" placeholder="Search" />
		</Form>
	);
}
