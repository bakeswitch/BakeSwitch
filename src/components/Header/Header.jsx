import React from "react";
import { Navbar, Nav } from "react-bootstrap";
// import SearchBar from "./SearchBar";
import HeaderBrand from "./HeaderBrand";
import AboutUsTab from "./AboutUsTab";
import Tab from "./OtherTabs";
// import MyProfileTab from "./MyProfileTab";
import LogOutTab from "./LogOutTab";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
	const { currentUser, userDoc } = useAuth();
	const isLoggedIn = currentUser?.emailVerified;
	const isSeller = currentUser ? userDoc?.isSeller : false;

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
			<HeaderBrand />
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse>
				{/* <SearchBar /> */}
				<Nav className="ms-auto">
					<AboutUsTab />
					<Tab hrefVal="/bakers" tabName="Bakers" />
					<Tab hrefVal="/bakes" tabName="Bakes" />
					{!isLoggedIn && <Tab hrefVal="/log-in" tabName="Login" />}
					{isLoggedIn && <Tab hrefVal="/order-cart" tabName="My Orders" />}
					{isSeller && <Tab hrefVal="/store/orders" tabName="My Store" />}
					{isLoggedIn && <Tab hrefVal="/profile-settings" tabName="My Profile" />}
					{/* {isLoggedIn && <MyProfileTab />} */}
					{isLoggedIn && <LogOutTab />}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
