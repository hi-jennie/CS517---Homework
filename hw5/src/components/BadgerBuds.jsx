import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import BadgerBudsNavbar from "./nav/BadgerBudsNavbar";
import BadgerBudsDataContext from "../contexts/BadgerBudsDataContext";

export default function BadgerBuds() {
  const [buds, setBuds] = useState([]);

  useEffect(() => {
    fetch("https://cs571.org/rest/f24/hw5/buds", {
      headers: {
        "X-CS571-ID":
          "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
      },
    })
      .then((res) => res.json())
      .then((cats) => {
        setBuds(cats);
      });
  }, []);

  console.log(buds);

  return (
    <div>
      <BadgerBudsNavbar />
      <div style={{ margin: "1rem" }}>
        <BadgerBudsDataContext.Provider value={buds}>
          <Outlet />
        </BadgerBudsDataContext.Provider>
      </div>
    </div>
  );
}
