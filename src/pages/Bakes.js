import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import SearchResults from "../components/SearchResults";
import Categories from "../components/SearchResults/Categories";
import styles from "./pages.module.css";

export default function Bakes() {
	const [isDefault, setIsDefault] = useState(true);
	const [searchTag, setSearchTag] = useState("");
	const [storeIDArr, setStoreIDArr] = useState([]);

	
	return (
		<div className={styles.contentBox}>
			<SearchBox
				setSearchTag={setSearchTag}
				setIsDefault={setIsDefault}
				setStoreIDArr={setStoreIDArr}
			/>
			{isDefault ? (
				<Categories setIsDefault={setIsDefault} setSearchTag={setSearchTag} />
			) : (
				<SearchResults searchTag={searchTag} storeIDArr={storeIDArr} />
			)}
		</div>
	);
}
