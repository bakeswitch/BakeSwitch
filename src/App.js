import React, { useState } from "react";
import Header from "./components/Header";
import LogIn from "./pages/LogIn";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	function handleLogIn() {
		setIsLoggedIn(true);
	}

	function handleLogOut() {
		setIsLoggedIn(false);
	}

	return (
		<>
			<Header isLoggedIn={isLoggedIn} onLogOut={handleLogOut} />
			<LogIn onLogIn={handleLogIn} />
		</>
	);
}

export default App;
