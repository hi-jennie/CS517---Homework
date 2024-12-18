import { useEffect, useState } from "react"
import Comment from "./Comment";
import LoginOrCreatePost from "./LoginOrCreatePost";
import { Col, Container, Row } from "react-bootstrap";

export default function CommentBoard(props) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        refreshComments();
    }, [])

    function refreshComments() {
        fetch("https://cs571.org/rest/f24/ice/comments", {
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        })
        .then(res => res.json())
        .then(comms => {
            setComments(comms)
            console.log(comments);
        })
    }

    return <div>
        <h1 style={{textAlign: "left"}}>Badger Comments</h1>
        <hr/>
        <Container fluid>
            <Row>
                <Col xs={12} md={6} lg={4} style={{marginBottom: "1rem"}}>
                    <LoginOrCreatePost refreshComments={refreshComments} />
                </Col>
                <Col xs={12} md={6} lg={8}>
                    <Container fluid>
                        <Row>
                            {
                                comments.map(c => <Col key={c.id} xs={12} lg={6} xl={4} xxl={3}>
                                    <Comment {...c} />
                                </Col>)
                            }
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    </div>
}