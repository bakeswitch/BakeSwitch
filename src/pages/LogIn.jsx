import React from "react";
import LogInBox from "../components/LogInBox";
import { auth, GoogleAuthProvider } from "../config/firebase";

export default function LogIn(props) {
	const googleSignIn = () => {
		auth.signInWithPopup(GoogleAuthProvider).then((result) => {
			props.onLogIn();
			alert("Welcome " + result.user.displayName + "!");
		});
	};

	const passwordSignIn = (email, password) => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				props.onLogIn();
				alert("Welcome " + result.user.displayName + "!");
			})
			.catch((error) => {
				const errorCode = error.code;
				switch (errorCode) {
					case "auth/invalid-email":
						alert("Please enter a valid email");
						break;
					case "auth/user-not-found":
						alert("User not found. Please sign up for an account.");
						break;
					case "auth/wrong-password":
						alert("Invalid password");
						break;
					default:
						alert(error.message);
				}
			});
	};

	return (
		<>
			<LogInBox googleSignInFunc={googleSignIn} passwordSignIn={passwordSignIn} />
		</>
	);
}
