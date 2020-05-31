import React from "react";
import "./chat-view.scss";
import ChatroomList from "../../components/chatroom-list/chatroom-list.component";
import NavigationBar from "../../components/navigation-bar/navigation-bar.component";
import Chatroom from "../../components/chatroom/chatroom.component";

class ChatView extends React.Component {
  render() {
    const { name, _id } = this.props.location.state.user;
    return (
      <div className="chat-view-container">
        <div className="left-view-container">
          <ChatroomList id={_id} />
        </div>
        <div className="right-view-container">
          <div className="right-nav-view">
            <NavigationBar name={name} />
          </div>
          <div className="right-body-view">
            <div className="chatroom-view">
              <Chatroom id={_id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatView;
