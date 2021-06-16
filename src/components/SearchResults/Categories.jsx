import React from "react";
import { Card, CardGroup } from "react-bootstrap";
import styles from "./SearchResults.module.css";


export default function Categories() {


    return (
        <CardGroup>  
            <Card className="bg-light text-dark" border="secondary" style={{width:"18rem"}}>
                <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg" alt="cake image" />
                <Card.Title>Cake</Card.Title>
            </Card>
            <Card className="bg-light text-dark" border="secondary" style={{width:"18rem"}}>
                <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg" alt="cake image" />
                <Card.Title>Cake</Card.Title>
            </Card>
            <Card className="bg-light text-dark" border="secondary" style={{width:"18rem"}}>
                <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg" alt="cake image" />
                <Card.Title>Cake</Card.Title>
            </Card>

        </CardGroup>
    )
}