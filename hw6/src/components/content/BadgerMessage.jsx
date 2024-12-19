import React from "react"
import { Card } from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}} >
        <h2 >{props.title}</h2>
        <sub style={{color: "#696969",marginBottom: "2rem"}}>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <i style={{color: "#555555", marginBottom: "0.5rem"}}>{props.poster}</i>
        <p style={{color: "#555555", marginBottom: "0.5rem"}}>{props.content}</p>
    </Card>
}

export default BadgerMessage;