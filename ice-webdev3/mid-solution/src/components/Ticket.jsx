/* eslint-disable react/prop-types */
import { Button, Card } from "react-bootstrap";

const Ticket = (props) => {

    const markTodo = () => {
        alert(props.name + " should move to todo!")
        props.move(props.id, props.status, "todo")
    }

    const markInProgress = () => {
        alert(props.name +  " should move to inprogress!")
        props.move(props.id, props.status, "inprogress")
    }

    const markDone = () => {
        alert(props.name + " should move to done!")
        props.move(props.id, props.status, "done")
    }

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2 style={{fontSize: "1.25rem"}}>{props.name}</h2>
        <p>{props.author}</p>
        <br/>
        <p>{props.description}</p>
        <Button variant="secondary" onClick={markTodo}>todo</Button>
        <Button variant="primary" onClick={markInProgress}>in progress</Button>
        <Button variant="success" onClick={markDone}>done</Button>
    </Card>
}

export default Ticket;