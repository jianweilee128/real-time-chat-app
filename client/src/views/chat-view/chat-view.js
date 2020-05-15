import React from "react";
import "./chat-view.scss";
import ChatroomList from "../../components/chatroom-list/chatroom-list.component";
import NavigationBar from "../../components/navigation-bar/navigation-bar.component";
import Chatroom from "../../components/chatroom/chatroom.component";
import UsersList from "../../components/users-list/users-list.component";

const ChatView = () => {
  return (
    <div className="chat-view-container">
      <div className="left-view-container">
        <ChatroomList />
      </div>
      <div className="right-view-container">
        <div className="right-nav-view">
          <NavigationBar />
        </div>
        <div className="right-body-view">
          <div className="chatroom-view">
            <Chatroom />
          </div>
          <div className="user-list-view">
            <UsersList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
