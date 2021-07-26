import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "./SearchResults.module.css";

function createCategory(title, imgURL) {
	return [title, imgURL];
}

export default function Categories(props) {
	const {
		setIsDefault,
		setSearchTag,
		// updateSearchBar
	} = props;

	const history = useHistory();
	// const [category, setCategory] = useState();
	// const [categoriesArr, setCategoriesArr] = useState([]);
	const categoriesArr = [
		createCategory("cake", "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg"),
		createCategory(
			"cookie",
			"https://cdn.pixabay.com/photo/2016/11/17/17/37/cookie-1832169_1280.jpg"
		),
		createCategory(
			"brownie",
			"https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591__340.jpg"
		),
		createCategory(
			"cupcake",
			"https://cdn.pixabay.com/photo/2015/03/26/09/39/cupcakes-690040__480.jpg"
		),
		createCategory(
			"tart",
			"https://images.pexels.com/photos/1157835/pexels-photo-1157835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
		),
		createCategory(
			"bread",
			"https://images.pexels.com/photos/2067621/pexels-photo-2067621.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
		),
		//pastry? https://www.snackandbakery.com/ext/resources/images/bakeryproducts.jpg?1432238179?
	];

	function redirect(cat) {
		setIsDefault(false);
		setSearchTag(cat);
	}

	return (
		<Row xs={1} md={3} className="mb-4 mt-4">
			{categoriesArr.map((category, index) => (
				<Col key={index}>
					<Card onClick={() => redirect(category[0])} className="mb-4">
						<Card.Img variant="top" src={category[1]} style={{ height: "250px" }} />
						<Card.Body style={{ backgroundColor: "rgba(233, 233, 233, 0.932)" }}>
							<Card.Title>{category[0]}</Card.Title>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
}
