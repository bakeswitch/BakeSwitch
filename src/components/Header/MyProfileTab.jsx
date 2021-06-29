import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./Header.module.css";

function MyProfileTab() {
	return (
		<div className={styles.tab}>
			<NavDropdown title="My Profile">
				<NavDropdown.Item href="/profile-settings">Profile settings</NavDropdown.Item>
				{/* <NavDropdown.Item href="/chats">Chats</NavDropdown.Item> */}
				<NavDropdown.Item href="/favourited">Favourited</NavDropdown.Item>
			</NavDropdown>
		</div>
	);
}

export default MyProfileTab;
