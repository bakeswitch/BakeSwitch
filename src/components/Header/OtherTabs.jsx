import React from "react";
import { Nav } from "react-bootstrap";
import styles from "./Header.module.css";

export default function Tab(props) {
  return (
    <div className={styles.tab}>
      <Nav.Link href={props.hrefVal}>{props.tabName}</Nav.Link>
    </div>
  );
}
