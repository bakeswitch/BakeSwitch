import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...otherDetails }) {
	const { currentUser } = useAuth();

	return (
		<Route
			{...otherDetails}
			render={(componentProps) => {
				return currentUser ? <Component {...componentProps} /> : <Redirect to="/log-in" />;
			}}
		></Route>
	);
}
