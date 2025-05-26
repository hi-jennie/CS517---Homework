import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

import TextAppMessageList from "./TextAppMessageList";
import MessageType from "./messages/MessageType";

import createChatAgent from "../../agent/ChatAgent";
import AudioRecorder from "../AudioRecorder";
import AIEmoteType from "./messages/AIEmoteType";
import { logout } from "../../agent/Util";
import createChatSynthesizer from "../../agent/ChatSynthesizer";
import ChatContext from "../../contexts/ChatContext";

const LOGOUT_ON_HOTRELOAD = true;

function TextApp() {
  const callbackQueueRef = useRef([]);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isSensitive, setIsSensitive] = useState(false);
  const [input, setInput] = useState("");

  const chatAgent = useMemo(() => createChatAgent(), []);
  const chatSynthesizer = useMemo(() => createChatSynthesizer(), []);

  const addMessage = (m) => {
    setMessages((o) => [...o, m]);
  };

  const addClientMessage = (txt) => {
    addMessage({ type: MessageType.CLIENT, text: txt });
  };

  const addAIMessage = (txt, emote) => {
    addMessage({ type: MessageType.AI, text: txt, emote: emote });
  };

  useEffect(() => {
    if (LOGOUT_ON_HOTRELOAD) {
      logout();
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    chatAgent.handleInitialize().then((m) => {
      handleAIMessages(m);
    });
  }, []);

  const handleSend = (e) => {
    e?.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      if (isSensitive) {
        addClientMessage("Sensitive information redacted!");
      } else {
        addClientMessage(trimmedInput);
      }
      setIsLoading(true);
      chatAgent.handleReceive(input).then((m) => {
        handleAIMessages(m);
      });
      setInput("");
      setIsSensitive(false);
    }
  };

  // this is to handle a ray of messages
  function handleAIMessages(ms) {
    if (Array.isArray(ms)) {
      ms.forEach((m, i) =>
        setTimeout(() => {
          handleAIMessage(m);
          if (i === ms.length - 1) {
            setIsLoading(false);
          }
        }, i * 750)
      );
    } else {
      handleAIMessage(ms);
      setIsLoading(false);
    }
  }
  // this is to handle single message
  // 这里区分两种情况，如果m是对象，则addAIMessage 时add m对象里的msg，和m的状态
  // 如果是字符串，直接addAIMessage就可以了
  function handleAIMessage(m) {
    if (typeof m === "object") {
      if (m.nextIsSensitive) {
        setIsSensitive(true);
      }
      // 如果 m.emote 不是 null 或 undefined，就用 m.emote；否则就用默认值 AIEmoteType.NORMAL。
      addAIMessage(m.msg, m.emote ?? AIEmoteType.NORMAL);
    } else {
      addAIMessage(m, AIEmoteType.NORMAL);
    }
  }

  return (
    <ChatContext.Provider value={{ chatAgent, chatSynthesizer }}>
      <div className="app">
        <TextAppMessageList messages={messages} />
        {isLoading ? <BeatLoader color="#36d7b7" /> : <></>}
        <div className="input-area">
          <AudioRecorder
            setInput={(i) => setInput(i)}
            isTranscribing={isTranscribing}
            setIsTranscribing={setIsTranscribing}
          />
          <Form className="inline-form" onSubmit={handleSend}>
            <Form.Control
              value={input}
              type={isSensitive ? "password" : "text"}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTranscribing}
              style={{ marginRight: "0.5rem", display: "flex" }}
              placeholder="Type a message..."
              aria-label="Type and submit to send a message."
            />
            <Button
              type="submit"
              disabled={isLoading || isTranscribing || !input.trim()}
            >
              Send
            </Button>
          </Form>
        </div>
      </div>
    </ChatContext.Provider>
  );
}

export default TextApp;
