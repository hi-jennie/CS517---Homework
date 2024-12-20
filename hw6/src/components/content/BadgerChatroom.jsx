import React, { useEffect, useState, useContext, useRef } from "react";
import BadgerMessage from "./BadgerMessage";
import { Container, Col, Row, Pagination, Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {
  const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  const titleRef = useRef();
  const contentRef = useRef();

  const loadMessages = () => {
    fetch(
      `https://cs571.org/rest/f24/hw6/messages?chatroom=${props.name}&page=1`,
      {
        headers: {
          "X-CS571-ID":
            "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setMessages(json.messages);
        console.log(json.messages);
      });
  };
  const currPageMes =
    messages.length > 8 ? messages.slice((page - 1) * 8, page * 8) : messages;

  const pageNum =
    messages.length >= 8 && messages.length % 8 === 0
      ? messages.length / 8
      : Math.ceil(messages.length / 8);

  const pagItems = (() => {
    const pagItemsList = [];
    for (let i = 1; i <= pageNum; i++) {
      pagItemsList.push(
        <Pagination.Item key={i} active={page === i} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return pagItemsList;
  })();

  const handleCreatePost = () => {
    if (
      titleRef.current.value.trim() === "" ||
      contentRef.current.value.trim() === ""
    ) {
      alert("You must provide both a title and content!");
    } else {
      fetch(`https://cs571.org/rest/f24/hw6/messages?chatroom=${props.name}`, {
        credentials: "include",
        method: "POST",
        headers: {
          "X-CS571-ID":
            "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleRef.current.value,
          content: contentRef.current.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          loadMessages();
        });
    }
  };

  const handleDeletePost = (id, poster) => {
    console.log("delete post");
    console.log(id);

    fetch("https://cs571.org/rest/f24/hw6/whoami", {
      credentials: "include",
      method: "GET",
      headers: {
        "X-CS571-ID":
          "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const userObj = json.user;
        if (userObj.username === poster) {
          fetch(`https://cs571.org/rest/f24/hw6/messages?id=${id}`, {
            credentials: "include",
            method: "DELETE",
            headers: {
              "X-CS571-ID":
                "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
            },
          })
            .then((res) => res.json())
            .then((json) => {
              console.log(json.msg);
              alert("Successfully deleted the post!");
              loadMessages();
            });
        }
      });
  };

  // Why can't we just say []?
  // The BadgerChatroom doesn't unload/reload when switching
  // chatrooms, only its props change! Try it yourself.
  useEffect(loadMessages, [props]);

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      <hr />
      {messages.length > 0 ? (
        <Container>
          <Row>
            {loginStatus ? (
              <Col sm={12} md={6} lg={4}>
                <Form>
                  <Form.Label>Post Title</Form.Label>
                  <Form.Control ref={titleRef} />
                  <br />

                  <Form.Label>Post Content</Form.Label>
                  <Form.Control ref={contentRef} />
                  <br />
                  <Button onClick={handleCreatePost}>Create Post</Button>
                </Form>
              </Col>
            ) : (
              <p>You must be logged in to post!</p>
            )}

            <Col sm={12} md={6} lg={8}>
              <Row>
                {currPageMes.map((mes) => {
                  return (
                    <Col key={mes.id} sm={12} md={6} lg={4} xl={3}>
                      <BadgerMessage
                        title={mes.title}
                        poster={mes.poster}
                        content={mes.content}
                        created={mes.created}
                        delete={() => handleDeletePost(mes.id, mes.poster)}
                      ></BadgerMessage>
                    </Col>
                  );
                })}
              </Row>
              <Pagination>{pagItems}</Pagination>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <p>There are no messages on this page yet!</p>
        </>
      )}
    </>
  );
}
