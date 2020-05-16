import React from "react";
import "./message.scss";

const Message = () => (
  <div className="message-container">
    <h3 className="message-info">
      Sam Smith<span>Fri 12.09pm</span>
    </h3>
    <span className="message-text">Test Message</span>
  </div>
);

export default Message;
