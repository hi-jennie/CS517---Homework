import { Button, Card } from "react-bootstrap";

const Ticket = (props) => {

    const markTodo = () => {
        alert(props.name + " should move to todo!")
    }

    const markInProgress = () => {
        alert(props.name +  " should move to inprogress!")
    }

    const markDone = () => {
        alert(props.name + " should move to done!")
    }

    return <Card style={{margin: "0.25rem"}}>
        <h2 style={{fontSize: "1.25rem"}}>{props.name}</h2>
        <sub>{props.author}</sub>
        <br/>
        <p>{props.description}</p>
        <Button variant="secondary" onClick={markTodo}>todo</Button>
        <Button variant="primary" onClick={markInProgress}>in progress</Button>
        <Button variant="success" onClick={markDone}>done</Button>
    </Card>
}

export default Ticket;