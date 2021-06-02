import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Bakers from "./Bakers";
import Bakes from "./Bakes";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import OrderCart from "./OrderCart";
import ProfileSettings from "./ProfileSettings";
import Chats from "./Chats";
import Favourited from "./Favourited";

function Webpages() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<Route exact path="/about" component={About} />
			<Route exact path="/bakers" component={Bakers} />
			<Route exact path="/bakes" component={Bakes} />
			<Route exact path="/log-in" component={LogIn} />
			<Route exact path="/sign-up" component={SignUp} />
			<Route exact path="/order-cart" component={OrderCart} />
			<Route exact path="/profile-settings" component={ProfileSettings} />
			<Route exact path="/chats" component={Chats} />
			<Route exact path="/favourited" component={Favourited} />
		</BrowserRouter>
	);
}

export default Webpages;
