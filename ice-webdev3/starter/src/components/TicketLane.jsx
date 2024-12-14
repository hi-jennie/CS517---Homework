/* eslint-disable react/prop-types */
import { Row, Col } from "react-bootstrap"
import Ticket from "./Ticket";

const TicketLane = (props) => {
    console.log(props.status)
    return <div>
        <Row>
            {
                props.tickets.map(ticket => {
                    return  <Col key={ticket.id} sm={12} md={6} lg={4}>
                        <Ticket {...ticket}/>
                    </Col>
                })
            }
        </Row>
        <br />
    </div>
}

export default TicketLane;