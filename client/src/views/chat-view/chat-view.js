import React from "react";
import "./chat-view.scss";
import NavigationBar from "../../components/navigation-bar/navigation-bar.component";
import Chatroom from "../../components/chatroom/chatroom.component";

class ChatView extends React.Component {
  render() {
    const { name, _id } = this.props.location.state.user;
    return (
      <div className="chat-view-container">
        <div className="left-view-container">
          <NavigationBar id={_id} name={name} />
        </div>
        <div className="right-view-container">
          <Chatroom id={_id} name={name} />
        </div>
      </div>
    );
  }
}

export default ChatView;
