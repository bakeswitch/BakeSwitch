import { StylesProvider } from "@material-ui/core";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./ProductNavPages.module.css";

export default function ProductContactBaker(props) {
	const storeData = props.storeData;

	if (!storeData) {
		return (
			<Container className={styles.productDetailBox}>
				<h3> Sorry, we are unable to load contacts] </h3>
			</Container>
		);
	}

	const {
		email: contactEmail = "nil",
		phoneNum: contactNumber = "nil",
		teleHandle: contactFacebook = "nil",
		instaLink: contactInstagram = "nil",
		websiteLink: storeWebsite = "nil",
	} = storeData;

	return (
		<Container className={styles.productDetailsBox}>
			<dl className="row sm mb-3 mt-3">
				{contactEmail && (
					<>
						<dt className="col-sm-3">Email</dt>
						<dd className="col-sm-9">{contactEmail}</dd>
					</>
				)}
				{contactNumber && (
					<>
						<dt className="col-sm-3">Number</dt>
						<dd className="col-sm-9">{contactNumber}</dd>
					</>
				)}
				{contactFacebook && (
					<>
						<dt className="col-sm-3">Facebook</dt>
						<dd className="col-sm-9">{contactFacebook}</dd>
					</>
				)}
				{contactInstagram && (
					<>
						<dt className="col-sm-3">Instagram</dt>
						<dd className="col-sm-9">{contactInstagram}</dd>
					</>
				)}
				{storeWebsite && (
					<>
						<dt className="col-sm-3">Website</dt>
						<dd className="col-sm-9">{storeWebsite}</dd>
					</>
				)}
			</dl>
		</Container>
	);
}
