import React, { useEffect, useState } from "react"
import BadgerMessage from "./BadgerMessage"
import {Container, Col, Row, Pagination} from "react-bootstrap"

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);

    const loadMessages = () => {
        fetch(`https://cs571.org/rest/f24/hw6/messages?chatroom=${props.name}&page=1`, {
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
            console.log(json.messages);
        })
    };
    const currPageMes = messages.length > 4 ? messages.slice((page-1) * 4, page * 4): messages;
    
    const pageNum =messages.length >= 4 && ((messages.length % 4) === 0)  ? 
                    messages.length / 4 : Math.ceil(messages.length / 4);

    
    const pagItems = (() => {
        const pagItemsList = [];
        for(let i = 1; i <= pageNum; i++){
            pagItemsList.push(
                <Pagination.Item 
                    active={page === i}
                    onClick={() => setPage(i)}
                >{i}</Pagination.Item>
            )
        }
        return pagItemsList;
    })();

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props]);

    console.log(currPageMes);
    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
        }
        <hr/>
        {
            messages.length > 0 ?
                <Container>
                    <Row>
                        {
                            currPageMes.map(mes => {
                                return <Col key={mes.id} sm={12} md={6}>
                                    <BadgerMessage  
                                    title={mes.title}
                                    poster={mes.poster}
                                    content={mes.content}
                                    created={mes.created}
                                    ></BadgerMessage> 
                                </Col>
                                
                            })
                        }
                    </Row>
                    <Pagination>
                        {pagItems}
                    </Pagination>   
                </Container>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
    </>
}
