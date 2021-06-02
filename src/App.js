import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WebPages from "./pages";
import { auth } from "./config/firebase";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState();
	const [isLoading, setIsLoading] = useState(true);

	auth.onAuthStateChanged(function (user) {
		if (user) {
			setIsLoggedIn(true);
			setIsLoading(false);
		} else {
			setIsLoggedIn(false);
			setIsLoading(false);
		}
	});

	return (
		!isLoading && (
			<>
				<Header isLoggedIn={isLoggedIn} />
				<WebPages isLoggedIn={isLoggedIn} />
			</>
		)
	);
}

export default App;
