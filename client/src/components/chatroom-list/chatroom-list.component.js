import React from "react";
import "./chatroom-list.scss";

const ChatroomList = () => (
  <React.Fragment>
    <div className="chatroom-list-container">
      <h1>Chats</h1>
      <input placeholder="Search..." type="text" className="search-box" />
      <span>Group Doggo</span>
      <span>Jane Doe</span>
      <span>NodeJS</span>
    </div>
    <div className="create-room-container">
      <input
        placeholder="Enter room name to create..."
        type="text"
        className="create-room-input"
      />
      <button className="create-button">create room</button>
    </div>
  </React.Fragment>
);

export default ChatroomList;
