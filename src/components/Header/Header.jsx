import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import SearchBar from "./SearchBar";
import HeaderBrand from "./HeaderBrand";
import AboutUsTab from "./AboutUsTab";
import Tab from "./OtherTabs";
import MyProfileTab from "./MyProfileTab";
import LogOutTab from "./LogOutTab";

function Header(props) {
	return (
		<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
			<HeaderBrand />
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse>
				<SearchBar />
				<Nav className="ms-auto">
					<AboutUsTab />
					<Tab hrefVal="/bakers" tabName="Bakers" />
					<Tab hrefVal="/bakes" tabName="Bakes" />
					{!props.isLoggedIn && <Tab hrefVal="/log-in" tabName="Log In" />}
					{props.isLoggedIn && <Tab hrefVal="/order-cart" tabName="My Order Cart" />}
					{props.isLoggedIn && <MyProfileTab />}
					{props.isLoggedIn && <LogOutTab />}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
