import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";

export default function BadgerRegister() {
  const usernameRef = useRef();
  const pinRef = useRef();
  const confirRef = useRef();

  const handleRegister = () => {
    if (
      usernameRef.current.value.trim() === "" ||
      pinRef.current.value.trim() === "" ||
      confirRef.current.value.trim() === ""
    ) {
      alert("You must provide both a username and pin!");
    } else {
      if (pinRef.current.value !== confirRef.current.value) {
        alert("Your pins do not match!");
      } else if (!/^\d{7}$/.test(pinRef.current.value)) {
        alert("Your pin must be a 7-digit number!");
      } else {
        fetch("https://cs571.org/rest/f24/hw6/register", {
          credentials: "include",
          method: "POST",
          headers: {
            "X-CS571-ID":
              "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernameRef.current.value,
            pin: pinRef.current.value,
          }),
        }).then((res) => {
          if (res.status === 409) {
            alert("That username has already been taken!");
          }
          if (res.status === 200) {
            alert("register successfully");
          }
        });
      }
    }
  };

  return (
    <>
      <h1>Register</h1>
      <Form style={{ color: "#4D4D4D" }}>
        <Form.Label>Username</Form.Label>
        <Form.Control ref={usernameRef} />
        <br />

        <Form.Label>Pin</Form.Label>
        <Form.Control type="password" ref={pinRef} />
        <br />

        <Form.Label>Confirmation Pin</Form.Label>
        <Form.Control type="password" ref={confirRef} />
        <br />
        <Button onClick={handleRegister}>Register</Button>
      </Form>
    </>
  );
}
