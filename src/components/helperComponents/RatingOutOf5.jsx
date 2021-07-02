import { AiFillStar } from "react-icons/ai";

export default function RatingOutOf5(num) {
    const numOfFilledStarsArr = Array.from(Array(num).keys());
    const numOfEmptyStarsArr = Array.from(Array(5 - num).keys());
    if (![0,1,2,3,4,5].includes(num)) {
        return alert("num not btw 0 and 5");
    } else {
        return (
            <>  
                {numOfFilledStarsArr.map(x => <AiFillStar className="text-warning mr-1" />)}
                {numOfEmptyStarsArr.map(x => <AiFillStar className="text-secondary mr-1" />)}
            </>
        )                                 
    }    
}