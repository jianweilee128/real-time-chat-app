import React from "react";
import "./chatroom.scss";
import Message from "../message/message.component";

const Chatroom = () => (
  <div className="chatroom-container">
    <div className="chatroom-screen">
      <Message />
      <Message />
      <Message />
    </div>
    <div className="chatroom-input">
      <input
        type="text"
        className="chatroom-text-input"
        name="chatroom-input"
        placeholder="Write your message..."
      />
      <button className="submit-button">Submit</button>
    </div>
  </div>
);

export default Chatroom;
