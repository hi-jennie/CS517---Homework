import React, { useRef } from 'react';
import {Form, Button} from "react-bootstrap"

export default function BadgerLogin() {
    const usernameRef = useRef();
    const passwordRef = useRef()
    

    const handleLogin = () => {
        if(usernameRef.current.value.trim() === "" || passwordRef.current.value.trim() === ""){
            alert("You must provide both a username and pin!");
        }else if (!/^\d{7}$/.test(passwordRef.current.value.trim())){
            alert("Your pin is a 7-digit number!");
        }else{
            console.log(usernameRef.current.value, passwordRef.current.value);
            fetch("https://cs571.org/rest/f24/hw6/login", {
                credentials: "include",
                method: "POST",
                headers: {
                    "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    pin: passwordRef.current.value
                })
            }).then(res => {
                if(res.status === 401){
                    alert("Incorrect username or pin!")
                }
                if(res.status === 200){
                    alert("Login successfully")
                }
            })
        }
    }
    return <>
        <h1>Login</h1>
        <Form style={{ color: '#4D4D4D' }}>
            <Form.Label >Username</Form.Label>
            <Form.Control ref={usernameRef}/><br/>

            <Form.Label >Password</Form.Label>
            <Form.Control type="password" ref={passwordRef}/><br/>
            <Button onClick={handleLogin}>Login</Button>
        </Form>
    </>
}
