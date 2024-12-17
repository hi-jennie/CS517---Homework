import { useContext } from "react";
import { useState, useEffect } from "react";
import BadgerBudsDataContext from "/Users/jennie/CS517---Homework/hw5/src/contexts/BadgerBudsDataContext.js";
import { Container, Col, Row } from "react-bootstrap";
import BasketItem from "./BasketItem";

// eslint-disable-next-line no-unused-vars
export default function BadgerBudsBasket(props) {
  const buds = useContext(BadgerBudsDataContext);
  const [savedCatIds, setSavedCatIds] = useState([]);

  useEffect(() => {
    const localSavedIds = JSON.parse(sessionStorage.getItem("savedCatIds"));
    if (localSavedIds && localSavedIds.length !== 0) {
      setSavedCatIds(localSavedIds);
      console.log(localSavedIds);
    } else {
      sessionStorage.setItem("adoptableBuds", JSON.stringify([]));
    }
  }, []);

  if (buds.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Badger Buds Basket</h1>
      <p>These cute cats could be all yours!</p>
      {savedCatIds.length !== 0 ? (
        <Container>
          <Row>
            {savedCatIds.map((id) => {
              const bud = buds.filter((bud) => bud.id === id)[0];
              return (
                <Col key={id} sm={12} md={6} lg={4} xl={3}>
                  <BasketItem
                    {...bud}
                    setSavedCatIds={setSavedCatIds}
                    buds={buds}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        "You have no buds in your basket!"
      )}
    </div>
  );
}
