import React from "react";
import { Form, FormControl } from "react-bootstrap";
import styles from "./Header.module.css";

export default function SearchBar() {
	return (
		<Form inline className={styles.searchBar}>
			<FormControl type="text" placeholder="Search" className="mr-sm-2" />
		</Form>
	);
}
