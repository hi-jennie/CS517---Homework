import React, { useEffect, useContext } from "react";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
export default function BadgerLogout() {
  const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
  useEffect(() => {
    fetch("https://cs571.org/rest/f24/hw6/logout", {
      method: "POST",
      headers: {
        "X-CS571-ID":
          "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setLoginStatus(false);
        sessionStorage.setItem("loginStatus", JSON.stringify(false));
        alert(json.msg);
      });
  }, []);

  return (
    <>
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
    </>
  );
}
