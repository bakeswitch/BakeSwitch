import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";

// export function useForceUpdate() {
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => value + 1); // update the state to force render
// }

export function useGlobalStoreIDAndNameArr() { //useFetch()
	const [status, setStatus] = useState("idle");
	const [storeIDAndNameArr, setStoreIDAndNameArr] = useState([]); //array of storeObjs 
	/*[	{storeID:"", storeName:""}, 
		{storeID:"", storeName:""}, 
		{storeID:"", storeName:""},...] */

	useEffect(() => {
		const fetchData = async () => {
			setStatus('fetching');
			const response = await db.collection("stores").get(); //returns querysnapshot
			response.forEach((doc) => {
				setStoreIDAndNameArr(prvArr => [...prvArr, {storeID:doc.id, storeName:doc.data().storeName}]);
			})
			setStatus('fetched');
		};

		fetchData();
	}, []);

	return { status, storeIDAndNameArr };
}

//took from https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/#creating-a-custom-hook
//not in use so commented out, was adapted for useGlobalStoreIDAndArr() hook
/*
const useFetch = (query) => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            setStatus('fetching');
            const response = await fetch(
                `https://hn.algolia.com/api/v1/search?query=${query}`
            );
            const data = await response.json();
            setData(data.hits);
            setStatus('fetched');
        };

        fetchData();
    }, [query]);

    return { status, data };
};
*/
