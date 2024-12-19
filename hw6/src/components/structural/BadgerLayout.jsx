import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import crest from "../../assets/uw-crest.svg";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerLayout(props) {
  // TODO @ Step 6:
  // You'll probably want to see if there is an existing
  // user in sessionStorage first. If so, that should
  // be your initial loginStatus state.
  const [loginStatus, setLoginStatus] = useState(undefined);

  const [chatRooms, setChatRooms] = useState([]);

  const getChatRooms = () => {
    fetch("https://cs571.org/rest/f24/hw6/chatrooms", {
      method: "GET",
      headers: {
        "X-CS571-ID":
          "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
      },
    })
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setChatRooms(data);
      });
  };

  useEffect(() => {
    getChatRooms();
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt="BadgerChat Logo"
              src={crest}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            BadgerChat
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="register">
              Register
            </Nav.Link>
            <NavDropdown title="Chatrooms">
              {chatRooms.map((room) => {
                return <NavDropdown.Item key={room}>{room}</NavDropdown.Item>;
              })}
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <div style={{ margin: "1rem" }}>
        <BadgerLoginStatusContext.Provider
          value={[loginStatus, setLoginStatus]}
        >
          <Outlet />
        </BadgerLoginStatusContext.Provider>
      </div>
    </div>
  );
}

export default BadgerLayout;
