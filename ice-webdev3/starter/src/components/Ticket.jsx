/* eslint-disable react/prop-types */
import { Card, Button } from "react-bootstrap";

const Ticket = (props) => {
    return <Card style={{margin: "0.5rem", padding: "1rem"}}>
        <p>I am a ticket!</p>
        <h2><strong>{props.name}</strong></h2>
        <p>{props.author}</p>
        <p>{props.description}</p>
        <Button variant="secondary">Todo</Button>
        <Button variant="primary"> In Progress</Button>
        <Button variant="success">Done</Button>
    </Card>
}

export default Ticket;