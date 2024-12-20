import React from "react";
import { Card, Button } from "react-bootstrap";

function BadgerMessage(props) {
  const dt = new Date(props.created);

  return (
    <Card style={{ margin: "0.5rem", padding: "0.5rem" }}>
      <h2>{props.title}</h2>
      <p style={{ color: "#696969", marginBottom: "2rem", fontSize: "0.7rem" }}>
        Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}
      </p>
      <i style={{ color: "#555555", marginBottom: "0.5rem" }}>{props.poster}</i>
      <p style={{ color: "#555555", marginBottom: "0.5rem" }}>
        {props.content}
      </p>
      <Button variant="danger" onClick={props.delete}>
        Delete Post
      </Button>
    </Card>
  );
}

export default BadgerMessage;
