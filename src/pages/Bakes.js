// import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import SearchResults from "../components/SearchResults";
import DefaultSearchResults from "../components/SearchResults/Categories";
import styles from "./pages.module.css";

export default function Bakes() {
	const [isSearching, setIsSearching] = useState(true);
	const [searchTag, setSearchTag] = useState("");

	return (
		<div className={styles.contentBox}>
			<SearchBox
				setSearchTag = {setSearchTag}
			/>
			<SearchResults
				searchTag = {searchTag}
			/>
			{/* {isSearching ? <SearchResults /> : <DefaultSearchResults />} */}
		</div>
	);
}
