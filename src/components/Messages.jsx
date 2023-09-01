import { useEffect, useRef } from "react";
import React from "react";
import "./Messages.css";

let messageIdCounter = 0;

export default function Messages({ messages, me }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <div className="Messages-container">
      <ul className="Messages-list">
        {messages.map((m) => (
          <Message key={messageIdCounter++} message={m} me={me} />
        ))}
        <div ref={bottomRef}></div>
      </ul>
    </div>
  );
}

function Message({ message, me }) {
  const { member, data } = message;
  const { username, color } = member.clientData;
  const messageFromMe = member.id === me.id;

  const className = messageFromMe
    ? "Messages-message currentMember"
    : "Messages-message";

  return (
    <li className={className}>
      <span className="avatar" style={{ backgroundColor: color }} />
      <div className="Message-content">
        <div className="username">{username}</div>
        <div className="text">{data}</div>
      </div>
    </li>
  );
}
