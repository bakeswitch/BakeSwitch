import React, { useState } from "react";
import Header from "./components/Header";
import LogIn from "./pages/LogIn";
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

	return (
		<>
			<Header isLoggedIn={isLoggedIn} onLogOut={handleLogOut} />
			<WebPages onLogIn={handleLogIn} />
		</>
	);
}

export default App;
