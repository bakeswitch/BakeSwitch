import React, { useState, useContext, useEffect } from "react";
import { auth, GoogleAuthProvider, db } from "../config/firebase";
// import { db } from "../config/firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [userDoc, setUserDoc] = useState();
	const [isLoading, setIsLoading] = useState(true);

	function signUp(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function googleLogIn() {
		return auth.signInWithPopup(GoogleAuthProvider);
	}

	function passwordLogIn(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function logOut() {
		return auth.signOut();
	}

	// Update currentUser and userDoc from database records
	useEffect(() => {
		//onAuthStateChanged returns method to unsubscribe
		const unsubscribe = auth.onAuthStateChanged(function (user) {
			setCurrentUser(user);
			if (user) {
				db.collection("users")
					.doc(user.uid)
					.get()
					.then((snapshot) => setUserDoc(snapshot.data()))
					.then(() => setIsLoading(false));
			} else {
				setIsLoading(false);
			}
		});

		// Performs clean-up by stopping the onAuthStateChanged listener to prevent memory leak
		return unsubscribe;
	}, []);

	// Stores all the values that are "shipped over" as the context when useAuth is imported in another file
	const contextValues = {
		currentUser,
		signUp,
		googleLogIn,
		passwordLogIn,
		resetPassword,
		logOut,
		userDoc,
	};

	// Only renders content when isLoading is false
	return (
		<AuthContext.Provider value={contextValues}>{!isLoading && children}</AuthContext.Provider>
	);
}
