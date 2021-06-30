import React, { useState } from "react";
import { Nav, Modal, Button } from "react-bootstrap";
import styles from "./Header.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function LogOutTab() {
	const { logOut } = useAuth();
	const history = useHistory();
	const [confLogout, setConfLogout] = useState(false);

	async function handleLogOut() {
		try {
			await logOut();
			// Redirects to home page after log out
			history.push("/");
			alert("You are logged out.");
		} catch (err) {
			alert("Log-out failed. " + err.message);
		}
	}

	return (
		<div className={styles.tab}>
			<Nav.Link onClick={() => setConfLogout(true)}>Log Out</Nav.Link>
			<Modal show={confLogout} onHide={() => setConfLogout(false)}>
				<Modal.Body>
					<div>
						<h5>Confirm log out?</h5>
						<Button
							variant="outline-primary"
							size="sm"
							onClick={handleLogOut}
							className={styles.delConfButton}
						>
							Yes
						</Button>
						<Button
							variant="outline-danger"
							size="sm"
							onClick={() => setConfLogout(false)}
							className={styles.delConfButton}
						>
							No
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
