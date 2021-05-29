import React, { useState } from "react";
import Header from "./components/Header";
import LogIn from "./pages/LogIn";
import WebPages from "./pages";
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
			<WebPages>
				<LogIn onLogIn={handleLogIn} />
			</WebPages>
		</>
	);
}

export default App;
