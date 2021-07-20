// import { Search } from "@material-ui/icons";
import React, { useState, useRef } from "react";
import SearchBox from "../components/SearchBox";
import SearchResults from "../components/SearchResults";
import Categories from "../components/SearchResults/Categories";
import styles from "./pages.module.css";

export default function Bakes() {
	const searchRef = useRef();
	const [searchText, setSearchText] = useState("");
	const [isDefault, setIsDefault] = useState(true);
	const [searchTag, setSearchTag] = useState("");

	function updateSearchBar(searchString) {
		searchRef.current.focus();
		setSearchText(searchString);
	}

	return (
		<div className={styles.contentBox}>
			<SearchBox
				setSearchTag={setSearchTag}
				setIsDefault={setIsDefault}
				searchText={searchText}
				searchRef={searchRef}
				updateSearchBar={updateSearchBar}
			/>
			{isDefault ? (
				<Categories
					setIsDefault={setIsDefault}
					setSearchTag={setSearchTag}
					updateSearchBar={updateSearchBar}
				/>
			) : (
				<SearchResults searchTag={searchTag} />
			)}
		</div>
	);
}
