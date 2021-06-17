import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import styles from "./SearchResults.module.css";

function createCategory(title, imgURL) {
    return [title, imgURL];
}

export default function Categories() {
    // const [category, setCategory] = useState();
    // const [categoriesArr, setCategoriesArr] = useState([]);
    const categoriesArr = [
        createCategory("cake", "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg"),
        createCategory("cake", "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg"),
        createCategory("cake", "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg"),
        createCategory("cake", "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg"),
        createCategory("cake", "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg"),
        createCategory("cake", "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg")
    ];
    

    return (
        <Row xs={1} md={3} className="g-4">
            {categoriesArr.map((category, idx) => (
                <Col>
                    <Card>
                        <Card.Img variant="top" src={category[1]} />
                        <Card.Body>
                        <Card.Title>{category[0]}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        // <CardGroup>  
        //     <Card className="bg-light text-dark" border="secondary" style={{width:"18rem"}}>
        //         <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg" alt="cake image" />
        //         <Card.Title>Cake</Card.Title>
        //     </Card>
        //     <Card className="bg-light text-dark" border="secondary" style={{width:"18rem"}}>
        //         <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg" alt="cake image" />
        //         <Card.Title>Cake</Card.Title>
        //     </Card>
        //     <Card className="bg-light text-dark" border="secondary" style={{width:"18rem"}}>
        //         <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg" alt="cake image" />
        //         <Card.Title>Cake</Card.Title>
        //     </Card>

        // </CardGroup>
    )
}