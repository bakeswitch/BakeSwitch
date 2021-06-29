import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import About from "./About";
import Bakers from "./Bakers";
import BakeProduct from "./BakeProduct";
import Bakes from "./Bakes";
import BakerProfile from "./BakerProfile";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import SignUpSeller from "./SignUpSeller";
import OrderCart from "./OrderCart";
import ProfileSettings from "./ProfileSettings";
// import Chats from "./Chats";
import Favourited from "./Favourited";
import ForgotPassword from "./ForgotPassword";
import Store from "./Store";
import Temporary from "../Temporary"; //delete when done testing

function Webpages() {
	return (
		<Switch>
			<Route exact path="/" component={Home} /> 
			<Route exact path="/about" component={About} />
			<Route exact path="/bakers" component={Bakers} />
			<Route exact path="/bakes" component={Bakes} />
			<Route exact path="/log-in" component={LogIn} />
			<Route exact path="/forgot-password" component={ForgotPassword} />
			<Route exact path="/sign-up" component={SignUp} />
			<PrivateRoute exact path="/sign-up-seller" component={SignUpSeller} />
			<PrivateRoute exact path="/order-cart" component={OrderCart} />
			<PrivateRoute exact path="/profile-settings" component={ProfileSettings} />
			{/* <PrivateRoute exact path="/chats" component={Chats} /> */}
			<PrivateRoute exact path="/favourited" component={Favourited} />
			<PrivateRoute path="/store" component={Store} />
			<Route
				exact
				path="/bakerProfile/:id"
				render={({ match }) => <BakerProfile storeID={match.params.id} />}
			/>
			<Route
				exact
				path="/bake-product/:id"
				render={({ match }) => <BakeProduct bakeID={match.params.id} />}
			/>
			{/* delete when done testing */}
			<PrivateRoute path="/temporary" component={Temporary} />
		</Switch>
	);
}

export default Webpages;
