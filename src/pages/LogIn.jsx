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

  return (
    <>
      <LogInBox googleSignInFunc={googleSignIn} />
    </>
  );
}
