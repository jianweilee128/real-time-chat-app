import React from "react";
import "./chat-card.scss";

const ChatCard = ({ sender, text, createdAt }) => (
  <div className="chatcard-container">
    <h3 className="chatcard-info">
      {sender}
      <span>{createdAt}</span>
    </h3>
    <span className="chatcard-text">{text}</span>
  </div>
);

export default ChatCard;
