import React from "react";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Header.module.css";

export default function HeaderBrand() {
	return (
		<Navbar.Brand href="/" className={styles.title}>
			BakeSwitch
		</Navbar.Brand>
	);
}
