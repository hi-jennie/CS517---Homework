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
                todo: ticketData,
                inprogress: [],
                done: []
            });
        })
    }, []);

    const moveItem = (id, from, to) => {
        alert(`card ${id} is move from ${from} to ${to}`);
        
        setTicketLanes(oldLanes => {
            const fromLane = oldLanes[from];
            const toLane = oldLanes[to];
            const movingTicket = fromLane.filter(ticket => ticket.id === id)[0];

            const updatedFromLane = fromLane.filter(ticket => ticket.id !== id);
            const updatedToLane = [...toLane, movingTicket];
            const updatedLanes = {...oldLanes, 
                [from]: updatedFromLane,
                [to]: updatedToLane
                };
            return updatedLanes;
        });

    }

    return <div>
        <h1>Ticket Board</h1>
        <Container fluid>
            {
                Object.keys(ticketLanes).map(laneName => {
                    return <TicketLane
                        key={laneName}
                        status={laneName}
                        tickets={ticketLanes[laneName]}
                        moveItem={moveItem}
                    />
                })
            }
        </Container>
    </div>
}

export default TicketBoard;