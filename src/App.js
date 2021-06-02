import React from "react";
import Header from "./components/Header";
import WebPages from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
	return (
		<AuthProvider>
			<Header />
			<WebPages isLoggedIn={true} />
		</AuthProvider>
	);
}

export default App;
