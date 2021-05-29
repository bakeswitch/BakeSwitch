import React, { useState } from "react";
import Header from "./components/Header";
import WebPages from "./pages";
import { auth } from "./config/firebase";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const hasUser = auth.currentUser != null;
	const [isLoggedIn, setIsLoggedIn] = useState(hasUser);

	function handleLogIn() {
		setIsLoggedIn(true);
	}

	function handleLogOut() {
		setIsLoggedIn(false);
	}

	auth.onAuthStateChanged(function (user) {
		if (user) {
			handleLogIn();
		} else {
			handleLogOut();
		}
	});

	return (
		<>
			<Header isLoggedIn={isLoggedIn} />
			<WebPages />
		</>
	);
}

export default App;
