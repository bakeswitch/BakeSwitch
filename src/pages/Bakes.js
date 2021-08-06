import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import SearchResults from "../components/SearchResults";
import Categories from "../components/SearchResults/Categories";
import { useGlobalStoreIDAndNameArr } from "../helperFunctions/customHooks";
import styles from "./pages.module.css";

export default function Bakes() {
	const [isDefault, setIsDefault] = useState(true); //necessary to load categories on initial page
	const [searchTag, setSearchTag] = useState("");
	const [searchStoreID, setSearchStoreID] = useState("");
	const [globalStoreIDAndNameArr, setGlobalStoreIDAndNameArr] = useState([]);
	const { status, storeIDAndNameArr } = useGlobalStoreIDAndNameArr();

	//If the array is empty, useEffect will only be called twice: 
	//once when the component mounts and once when the component unmounts.

	return status != "fetching" && (
		<div className={styles.contentBox}>
			<SearchBox
				setSearchTag={setSearchTag}
				setSearchStoreID={setSearchStoreID}
				setIsDefault={setIsDefault}
				globalStoreIDAndNameArr = {storeIDAndNameArr}
			/>
			{isDefault ? (
				<Categories 
					setIsDefault={setIsDefault} 
					setSearchTag={setSearchTag} 
					setSearchStoreID={setSearchStoreID}
				/>
			) : (
				<SearchResults 
					searchTag={searchTag} 
					searchStoreID={searchStoreID} 	
				/>
			)}
		</div>
	);
}
