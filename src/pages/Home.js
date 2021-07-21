import React from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./pages.module.css";

export default function Home() {
	const history = useHistory();
	const { currentUser, userDoc } = useAuth();

	function handleSellClick() {
		const isLoggedIn = currentUser?.emailVerified;
		const isSeller = currentUser ? userDoc?.isSeller : false;

		if (isLoggedIn && isSeller) {
			history.push("/store/orders");
		} else if (isLoggedIn) {
			history.push("/sign-up-seller");
		} else {
			history.push("/log-in");
		}
	}

	return (
		<>
			<div className={styles.howSection}>
				<h2 className="mb-5">How to BakeSwitch?</h2>
				<Container>
					<Row>
						<Col xs={12} md={4}>
							<div onClick={() => history.push("/bakers")}>
								<Image
									src="https://cdn.pixabay.com/photo/2019/05/06/12/59/bread-4183076_1280.jpg"
									roundedCircle
									className={styles.howSectionImg}
								/>
								<h3>Browse Bakers</h3>
								<p>Find your next favourite local homebaker</p>
							</div>
						</Col>
						<Col xs={12} md={4}>
							<div onClick={() => history.push("/bakes")}>
								<Image
									src="https://cdn.pixabay.com/photo/2020/05/05/13/27/pie-5133105_1280.jpg"
									roundedCircle
									className={styles.howSectionImg}
								/>
								<h3>Browse Bakes</h3>
								<p>Order an assortment of delectable bakes</p>
							</div>
						</Col>
						<Col xs={12} md={4}>
							<div onClick={handleSellClick}>
								<Image
									src="https://cdn.pixabay.com/photo/2017/08/06/05/48/bake-2589210_1280.jpg"
									roundedCircle
									className={styles.howSectionImg}
								/>
								<h3>Sell Bakes</h3>
								<p>Share your delicious treats with customers</p>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}
