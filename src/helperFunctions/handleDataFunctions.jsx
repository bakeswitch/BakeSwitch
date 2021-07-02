//RETURNS: array of arrays [price, qty], which is sorted by price in ascending order
export function orderPriceAndQtyArr(bakeData) {
	// const [orderedPnQ, setOrderedPnQ] = useState({});
	if (bakeData != null) {
		const { bakePriceAndQty: unorderedPnQ } = bakeData;
		const unorderedKeys = Object.keys(unorderedPnQ);
		const orderedPnQArr = unorderedKeys
			.sort((a, b) => a - b) 			//sort keys in ascending order [1,2,3]
			.map(price => [price, unorderedPnQ[price]]); //place them in nested array [[p1,q1], [p2,q2], ...]
		return orderedPnQArr;
	} else {
		return alert("bakeData is empty, price and qty cannot be ordered");
	}
}