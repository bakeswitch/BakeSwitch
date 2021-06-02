import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./Header.module.css";

function MyProfileTab() {
	const loggedInTabs = [
		{
			hrefVal: "/profile-settings",
			tabName: "Profile settings",
		},
		{
			hrefVal: "/chats",
			tabName: "Chats",
		},
		{
			hrefVal: "/favourited",
			tabName: "Favourited",
		},
	];

	return (
		<div className={styles.tab}>
			<NavDropdown title="My Profile">
				{loggedInTabs.map((item) => (
					<NavDropdown.Item href={item.hrefVal}>{item.tabName}</NavDropdown.Item>
				))}
			</NavDropdown>
		</div>
	);
}

export default MyProfileTab;
