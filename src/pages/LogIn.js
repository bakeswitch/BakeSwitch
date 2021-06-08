import React from "react";
import LogInBox from "../components/LogInBox";
import styles from "./pages.module.css";

export default function LogIn() {
	return (
		<div className={styles.formBox}>
			<LogInBox />
		</div>
	);
}
