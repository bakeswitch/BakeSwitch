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

	// 		.then((result) => {
	// 			alert("Welcome " + result.user.displayName + "!");
	// 		})
	// 		.catch((error) => {
	// 			const errorCode = error.code;
	// 			switch (errorCode) {
	// 				case "auth/invalid-email":
	// 					alert("Please enter a valid email");
	// 					break;
	// 				case "auth/user-not-found":
	// 					alert("User not found. Please sign up for an account.");
	// 					break;
	// 				case "auth/wrong-password":
	// 					alert("Invalid password");
	// 					break;
	// 				default:
	// 					alert(error.message);
	// 			}
	// 		});
	// };

	function logOut() {
		return auth.signOut();
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(function (user) {
			setCurrentUser(user);
			setIsLoading(false);
		});

		// Performs clean-up by stopping the onAuthStateChanged listener
		return unsubscribe;
	}, []);

	const value = { currentUser, googleLogIn, passwordLogIn, logOut };

	return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}
