import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

function Webpages(props) {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			{/* Pass the function to change log in state to the Log In page  */}
			<Route path="/log-in" render={() => <LogIn onLogIn={props.onLogIn} />} />
			<Route path="/sign-up" component={SignUp} />
		</BrowserRouter>
	);
}

export default Webpages;
