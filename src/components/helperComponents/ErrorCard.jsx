import { Card } from "react-bootstrap";

export default function ErrorCard(errString) {
    return (
        <Card>
            <Card.Title> Sorry, we are unable to find the data you are looking for </Card.Title>
            <Card.Text> Error: {errString} </Card.Text>
        </Card>
    )
}