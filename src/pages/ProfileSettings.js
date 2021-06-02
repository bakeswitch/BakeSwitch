import React from "react";
import { Redirect } from "react-router-dom";

export default function ProfileSettings(props) {
	if (!props.isLoggedIn) {
		return <Redirect to="/log-in" />;
	}
	//replace with actual content
	return <h3 style={{ padding: "5rem" }}>Profile settings page in construction</h3>;
}
