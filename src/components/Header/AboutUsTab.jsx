import React from "react";
import { NavDropdown } from "react-bootstrap";
import styles from "./Header.module.css";

export default function AboutUsTab() {
	return (
		<div className={styles.tab}>
			<NavDropdown title="About Us">
				<NavDropdown.Item href="/about#our-story">Our Story</NavDropdown.Item>
				<NavDropdown.Item href="/about#faq">FAQ</NavDropdown.Item>
				<NavDropdown.Item href="/about#contact">Contact</NavDropdown.Item>
			</NavDropdown>
		</div>
	);
}
