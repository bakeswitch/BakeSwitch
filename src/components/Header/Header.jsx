import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import SearchBar from "./SearchBar";
import HeaderBrand from "./HeaderBrand";
import AboutUsTab from "./AboutUsTab";
import Tab from "./OtherTabs";
import LogOutTab from "./LogOutTab";

function Header(props) {
	const tabDetails = [
		{
			hrefVal: "",
			tabName: "Bakers",
		},
		{
			hrefVal: "",
			tabName: "Bakes",
		},
	];

	const loggedOutTabs = [
		...tabDetails,
		{
			hrefVal: "/log-in",
			tabName: "Log In",
		},
	];

	const loggedInTabs = [
		...tabDetails,
		{
			hrefVal: "",
			tabName: "Profile settings",
		},
		{
			hrefVal: "",
			tabName: "Chats",
		},
		{
			hrefVal: "",
			tabName: "Favourited",
		},
	];

	//Determine which set of tabs to show depending on whether user is logged in
	const currentTabs = props.isLoggedIn ? loggedInTabs : loggedOutTabs;

	return (
		<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
			<HeaderBrand />
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse>
				<SearchBar />
				<Nav>
					<AboutUsTab />
					{currentTabs.map((item) => (
						<Tab hrefVal={item.hrefVal} tabName={item.tabName} />
					))}
					{/* Log Out tab only shows when isLogggedIn is true */}
					{props.isLoggedIn && <LogOutTab onLogOut={props.onLogOut} />}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
