import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Webpages = () => {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<Route path="/log-in" component={LogIn} />
			<Route path="/sign-up" component={SignUp} />
		</BrowserRouter>
	);
};

export default Webpages;
