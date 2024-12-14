import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import TicketLane from './TicketLane'

const TicketBoard = () => {

    const [ticketLanes, setTicketLanes] = useState({
        todo: [],
        inprogress: [],
        done: [],
    })

    useEffect(() => {
        fetch('https://cs571.org/rest/f24/ice/tickets', {
            headers: {
                "X-CS571-ID":
                "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
            }
        })
        .then(res => res.json())
        .then(ticketData => {
            console.log(ticketData);
            setTicketLanes({
                todo: ticketData, // TODO Put the tickets in the the todo lane!
                inprogress: [],
                done: []
            });
        })
    }, []);

    return <div>
        <h1>Ticket Board</h1>
        <Container fluid>
            {
                Object.keys(ticketLanes).map(laneName => {
                    return <TicketLane key={laneName} status={laneName} tickets={ticketLanes[laneName]}/>
                })
            }
        </Container>
    </div>
}

export default TicketBoard;