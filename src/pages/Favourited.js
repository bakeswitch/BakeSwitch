import React from "react";
import { Redirect } from "react-router-dom";

export default function Favourited(props) {
	if (!props.isLoggedIn) {
		return <Redirect to="/log-in" />;
	}
	//replace with actual content
	return <h3 style={{ padding: "5rem" }}>Favourited page in construction</h3>;
}
