import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function LoginOrCreatePost(props) {
    
    // Note! You should use this in combination with sessionStorage.
    // Otherwise, when the user refreshes the page, it will go away!
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleLoginSubmit(e) {
        e?.preventDefault();  // prevents default form submit action
        console.log(username,password)
        fetch("https://cs571.org/rest/f24/ice/login", {
            credentials:"include",
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => {
            if(res.status === 401){
                alert("Your username or password is invalid")
            }else if(res.status === 200){
                alert("You are successfully logged in")
            }
        })
    }

    function handleCommentSubmit(e) {
        e?.preventDefault(); // prevents default form submit action
        
        // TODO: POST to https://cs571.org/rest/f24/ice/comments
    }

    function handleLogout() {
        // TODO POST to https://cs571.org/rest/f24/ice/logout
    }

    if (isLoggedIn) {
        return <>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
            <Form onSubmit={handleCommentSubmit}>
                <Form.Label htmlFor="commentInput">Your Comment</Form.Label>
                <Form.Control id="commentInput"></Form.Control>
                <br/>
                <Button type="submit" onClick={handleCommentSubmit}>Post Comment</Button>
            </Form>
        </>
    } else {
        return <Form onSubmit={handleLoginSubmit}>
            <Form.Label htmlFor="usernameInput" >Username</Form.Label>
            <Form.Control id="usernameInput" value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
            <Form.Label htmlFor="passwordInput" >Password</Form.Label>
            <Form.Control id="passwordInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            <br/>
            <Button type="submit" onClick={handleLoginSubmit}>Login</Button>
        </Form>
    }
}