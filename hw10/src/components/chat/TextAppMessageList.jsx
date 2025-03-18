import { useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import Message from "./messages/Message";

export default function TextAppMessageList({ messages }) {
  const lastItem = useRef();

  // scrollIntoView({ behavior: 'smooth' }) 是一个 DOM 方法，
  // 用来将页面滚动到某个元素的位置。behavior: 'smooth' 会使滚动动画平滑过渡。
  // 并且当新消息加入时，页面会自动滚动到最后一条消息。以下是对这段代码的详细解释：
  useEffect(() => {
    lastItem.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container className="message-list">
      {messages.map((message, i) => (
        <div ref={i === messages.length - 1 ? lastItem : undefined} key={i}>
          <Row style={{ display: "flow-root", marginBottom: "0.5rem" }}>
            <Message type={message.type}>
              <p>{message.text}</p>
            </Message>
          </Row>
        </div>
      ))}
    </Container>
  );
}
