/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";

export default function Comment(props) {

    console.log("I have rendered!")

    const createdDt = new Date(props.created);

    return <Card style={{margin: "0.5rem"}}>
        <p>{props.comment}</p>
        <p>Posted on {createdDt.toLocaleDateString()} at {createdDt.toLocaleTimeString()} by {props.author}</p>
    </Card>
}

