import React from "react";
import "./chat-view.scss";
import NavigationBar from "../../components/navigation-bar/navigation-bar.component";
import Chatroom from "../../components/chatroom/chatroom.component";
import UpdateProfile from "../../components/update-profile/update-profile.component";
import { connect } from "react-redux";

const ChatView = ({ isUpdateProfile }) => {
  return (
    <div className="chat-view-container">
      <div className="left-view-container">
        <NavigationBar />
      </div>
      <div className="right-view-container">
        {!isUpdateProfile ? <Chatroom /> : <UpdateProfile />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isUpdateProfile: state.user.isUpdateProfile,
  };
};
export default connect(mapStateToProps)(ChatView);
