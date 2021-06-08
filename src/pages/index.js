import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
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
import ForgotPassword from "./ForgotPassword";

function Webpages(props) {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/about" component={About} />
			<Route exact path="/bakers" component={Bakers} />
			<Route exact path="/bakes" component={Bakes} />
			<Route exact path="/log-in" component={LogIn} />
			<Route exact path="/forgot-password" component={ForgotPassword} />
			<Route exact path="/sign-up" component={SignUp} />
			<PrivateRoute exact path="/order-cart" component={OrderCart} />
			<PrivateRoute exact path="/profile-settings" component={ProfileSettings} />
			<PrivateRoute exact path="/chats" component={Chats} />
			<PrivateRoute exact path="/favourited" component={Favourited} />
		</Switch>
	);
}

export default Webpages;
