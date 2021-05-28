import React from "react";
import { Navbar } from "react-bootstrap";
import styles from "./Header.module.css";

export default function HeaderBrand() {
  return (
    <Navbar.Brand href="#home" className={styles.title}>
      BakeSwitch
    </Navbar.Brand>
  );
}
