// import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import SearchResults from "../components/SearchResults";
import DefaultSearchResults from "../components/SearchResults/Categories";
import styles from "./pages.module.css";

export default function Bakes() {
	const [isSearching, setIsSearching] = useState(false);

	return (
		<div className={styles.contentBox}>
			<SearchBox />
			{isSearching ? <SearchResults /> : <DefaultSearchResults />}
		</div>
	);
}
