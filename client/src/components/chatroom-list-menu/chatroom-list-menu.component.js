import React from "react";
import { setToggleDropdown } from "../../redux/room/room.actions";
import "./chatroom-list-menu.scss";
import ChatroomDropdown from "../chatroom-dropdown/chatroom-dropdown.component";
import { connect } from "react-redux";

const ChatroomListMenu = ({ setToggleDropdown, toggleDropdown }) => (
  <div className="chatroom-list-menu-container">
    <div className="chatroom-list-menu">
      <span>rooms</span>
    </div>
    <div className="chatroom-list-menu">
      <span>users</span>
    </div>
    <div className="chatroom-list-menu">
      <span onClick={() => setToggleDropdown()}>settings</span>
      {toggleDropdown ? <ChatroomDropdown /> : null}
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  setToggleDropdown: () => dispatch(setToggleDropdown()),
});

const mapStateToProps = (state) => {
  return {
    toggleDropdown: state.room.toggleDropdown,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomListMenu);
