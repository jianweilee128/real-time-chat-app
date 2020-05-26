import React from "react";
import "./chatroom-list.scss";
import ChatroomCard from "../chatroom-card/chatroom-card.component";

const ChatroomList = ({ name, id }) => {
  return (
    <React.Fragment>
      <div className="chatroom-list-container">
        <h1>Chats</h1>
        <input placeholder="Search..." type="text" className="search-box" />
        <ChatroomCard room="general" id={id} username={name} />
        <ChatroomCard room="test" id={id} username={name} />
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
};

export default ChatroomList;
