/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function LoginOrCreatePost(props) {
    
    // Note! You should use this in combination with sessionStorage.
    // Otherwise, when the user refreshes the page, it will go away!
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();
    const commentRef = useRef();

    function handleLoginSubmit(e) {
        e?.preventDefault();  // prevents default form submit action
        fetch("https://cs571.org/rest/f24/ice/login", {
            credentials:"include",
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })
        }).then(res => {
            if(res.status === 401){
                alert("Your username or password is invalid")
            }else if(res.status === 200){
                alert("You are successfully logged in")
                setIsLoggedIn(true);
            }
        })
    }

    function handleCommentSubmit(e) {
        e?.preventDefault(); // prevents default form submit action
        console.log(commentRef.current.value);
        fetch("https://cs571.org/rest/f24/ice/comments", {
            credentials:"include",
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
                "Content-Type": "application/json"},
            body: JSON.stringify({
                comment: commentRef.current.value
            })
        }).then(res => {
            console.log(res.status);
            props.refreshComments();
        })}

    function handleLogout() {
        fetch("https://cs571.org/rest/f24/ice/logout", {
            credentials:"include",
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"  
        }}).then(res => {
            console.log(res.status);
            setIsLoggedIn(false);
        })
    }

    if (isLoggedIn) {
        return <>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
            <Form onSubmit={handleCommentSubmit}>
                <Form.Label htmlFor="commentInput">Your Comment</Form.Label>
                <Form.Control id="commentInput" ref={commentRef}></Form.Control>
                <br/>
                <Button type="submit" onClick={handleCommentSubmit}>Post Comment</Button>
            </Form>
        </>
    } else {
        return <Form onSubmit={handleLoginSubmit}>
            <Form.Label htmlFor="usernameInput" >Username</Form.Label>
            <Form.Control id="usernameInput" ref={usernameRef}></Form.Control>
            <Form.Label htmlFor="passwordInput" >Password</Form.Label>
            <Form.Control id="passwordInput" type="password" ref={passwordRef}></Form.Control>
            <br/>
            <Button type="submit" onClick={handleLoginSubmit}>Login</Button>
        </Form>
    }
}