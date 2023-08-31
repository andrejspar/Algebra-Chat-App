import { useEffect, useRef } from "react";
import React from "react";
import "./Messages.css";

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
        {messages.map((m) =>
          Message(
            m,
            me,
            m.member.id === me.id ? "currentMember" : "otherActiveMember"
          )
        )}
        <div ref={bottomRef}></div>
      </ul>
    </div>
  );
}

function Message({ member, data, id }, me) {
  const { username, color } = member.clientData;
  const messageFromMe = member.id === me.id;
  const className = messageFromMe
    ? "Messages-message currentMember"
    : "Messages-message";
  return (
    <li key={id} className={className}>
      <span className="avatar" style={{ backgroundColor: color }} />
      <div className="Message-content">
        <div className="username">{username}</div>
        <div className="text">{data}</div>
      </div>
    </li>
  );
}
