import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import SearchBar from "./SearchBar";
import HeaderBrand from "./HeaderBrand";
import AboutUsTab from "./AboutUsTab";
import Tab from "./OtherTabs";
import MyProfileTab from "./MyProfileTab";
import LogOutTab from "./LogOutTab";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";

function Header() {
	const { currentUser } = useAuth();
	const isLoggedIn = currentUser?.emailVerified;
	const isSeller = currentUser
		? db
				.collection("users")
				.doc(currentUser.uid)
				.get()
				.then((snapshot) => snapshot.get("isSeller"))
		: false;

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
			<HeaderBrand />
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse>
				<SearchBar />
				<Nav className="ms-auto">
					<AboutUsTab />
					<Tab hrefVal="/bakers" tabName="Bakers" />
					<Tab hrefVal="/bakes" tabName="Bakes" />
					{!isLoggedIn && <Tab hrefVal="/log-in" tabName="Log In" />}
					{isLoggedIn && <Tab hrefVal="/order-cart" tabName="My Order Cart" />}
					{isSeller && <Tab hrefVal="/store" tabName="My Shop" />}
					{isLoggedIn && <MyProfileTab />}
					{isLoggedIn && <LogOutTab />}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
