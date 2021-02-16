import React from "react";
import "./Message.css";
import { useStateValue } from "./StateProvider";

function Message({ senderUid, message, timestamp }) {
  const [{ user }] = useStateValue();

  return (
    <div className={`message ${senderUid === user.uid ? "sender" : ""}`}>
      <p className="message_text">{message}</p>
      <span className="timestamp">
        {new Date(timestamp?.toDate()).toUTCString()}
      </span>
    </div>
  );
}

export default Message;
