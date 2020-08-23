import React from "react";
import "./chat-card.scss";

const ChatCard = ({ sender, text, timestamp }) => (
  <div className="chatcard-container">
    <div className="chatcard-info">
      <span className="sender">{sender}</span>
      <span className="timestamp">{timestamp}</span>
    </div>
    <span className="chatcard-text">{text}</span>
  </div>
);

export default ChatCard;
