import { useContext } from "react"
import BadgerBudsDataContext from "/Users/jennie/CS517---Homework/hw5/src/contexts/BadgerBudsDataContext.js";
import {Card, Container, Row, Col} from "react-bootstrap"
import BadgerBudSummary from "./BadgerBudSummary";

export default function BadgerBudsAdoptable(props) {
    const buds = useContext(BadgerBudsDataContext);
    return <div>
        <h1>Available Badger Buds</h1>
        <Container fluid>
            <Row>
                {buds.map(bud => (
                    <Col sm={12} md={6} lg={4} xl={3} xxl={2} key={bud.id}>
                            <BadgerBudSummary {...bud} />
                    </Col>
                ))}
            </Row>
        </Container>
        
    </div>
}