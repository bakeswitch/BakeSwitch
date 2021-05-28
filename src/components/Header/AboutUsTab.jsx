import React from "react";
import { NavDropdown } from "react-bootstrap";
import styles from "./Header.module.css";

export default function AboutUsTab() {
  return (
    <div className={styles.aboutUsTab}>
      <NavDropdown title="About Us" id="about-us">
        <NavDropdown.Item href="#our-story">Our Story</NavDropdown.Item>
        <NavDropdown.Item href="#contact">Contact</NavDropdown.Item>
        <NavDropdown.Item href="#faq">FAQ</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}
