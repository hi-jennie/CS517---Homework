import { useContext } from "react";
import { useState, useEffect } from "react";
import BadgerBudsDataContext from "/Users/jennie/CS517---Homework/hw5/src/contexts/BadgerBudsDataContext.js";
import {Container, Col, Row} from "react-bootstrap"
import BasketItem from "./BasketItem";

// eslint-disable-next-line no-unused-vars
export default function BadgerBudsBasket(props) {
    const buds = useContext(BadgerBudsDataContext);
    console.log(buds);
    const [savedCatIds, setSavedCatIds] = useState([]);
    console.log(savedCatIds);
    
    useEffect(() =>{
        const localSavedIds = JSON.parse(sessionStorage.getItem("savedCatIds"));
        if(localSavedIds && localSavedIds.length !== 0){
            setSavedCatIds(localSavedIds);
        }else{
            sessionStorage.setItem("adoptableBuds", JSON.stringify([]));
        }
    },[])
    
    if (buds.length === 0) {
        return <p>Loading...</p>;
    }

    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        <Container>
            <Row>
            {savedCatIds.map(id => {
                console.log(id);
                const bud = buds.filter(bud => bud.id === id)[0];
                console.log(bud);
                return <Col key={id} sm={12} md={6} lg={4} xl={3}>
                    <BasketItem {...bud} setSavedCatIds={setSavedCatIds} buds={buds}/>
                </Col>
        })}
            </Row>
        </Container>
    </div>
}