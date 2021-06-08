import React, { useState, useContext, useEffect } from "react";
import { auth, GoogleAuthProvider } from "../config/firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [isLoading, setIsLoading] = useState(true);

	function googleLogIn() {
		return auth.signInWithPopup(GoogleAuthProvider);
	}

	function passwordLogIn(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logOut() {
		return auth.signOut();
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(function (user) {
			setCurrentUser(user);
			setIsLoading(false);
		});

		// Performs clean-up by stopping the onAuthStateChanged listener to prevent memory leak
		return unsubscribe;
	}, []);

	// Stores all the values that are "shipped over" as the context when useAuth is imported in another file
	const contextValues = { currentUser, googleLogIn, passwordLogIn, logOut };

	return (
		<AuthContext.Provider value={contextValues}>{!isLoading && children}</AuthContext.Provider>
	);
}
