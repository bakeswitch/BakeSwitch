import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Bakers from "./Bakers";
import Bakes from "./Bakes";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

function Webpages() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<Route exact path="/about" component={About} />
			<Route exact path="/bakers" component={Bakers} />
			<Route exact path="/bakes" component={Bakes} />
			<Route path="/log-in" component={LogIn} />
			<Route path="/sign-up" component={SignUp} />
		</BrowserRouter>
	);
}

export default Webpages;
