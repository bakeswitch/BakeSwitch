// import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import SearchResults from "../components/SearchResults";
import DefaultSearchResults from "../components/SearchResults/Categories";
import styles from "./pages.module.css";

export default function Bakes() {
	const [isSearching, setIsSearching] = useState(true);

	return (
		<div className={styles.contentBox}>
			<SearchBox/>
			<SearchResults />
			{/* {isSearching ? <SearchResults /> : <DefaultSearchResults />} */}
		</div>
	);
}
