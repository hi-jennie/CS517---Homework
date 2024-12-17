import { useContext, useState} from "react"
import BadgerBudsDataContext from "/Users/jennie/CS517---Homework/hw5/src/contexts/BadgerBudsDataContext.js";
import {Card, Container, Row, Col} from "react-bootstrap"
import BadgerBudSummary from "./BadgerBudSummary";
import { useEffect } from "react";

export default function BadgerBudsAdoptable(props) {
    const buds = useContext(BadgerBudsDataContext);
    const [adoptableBuds, setAdoptableBuds] = useState([]);

    useEffect(() => {
        const localAdoptableBuds = JSON.parse(sessionStorage.getItem("adoptableBuds"));
        if (localAdoptableBuds && localAdoptableBuds.length > 0) {
            setAdoptableBuds(localAdoptableBuds);
        } else {
            setAdoptableBuds(buds);
            sessionStorage.setItem("adoptableBuds", JSON.stringify(buds));      
        }
    }, []);
    
    return <div>
        <h1>Available Badger Buds</h1>
        {adoptableBuds.length !== 0 ?
            <Container fluid>
                <Row>
                    {adoptableBuds.map(bud => (
                        <Col sm={12} md={6} lg={4} xl={3} xxl={4} key={bud.id} >
                                <BadgerBudSummary {...bud} setAdoptableBuds={setAdoptableBuds}/>
                        </Col>
                    ))}
                </Row>
            </Container> : "No buds are available for adoption!"
        }     
    </div>
}