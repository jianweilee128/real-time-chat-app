import React from "react";
import "./chatroom-dropdown.scss";
import {
  setToggleDelete,
  setToggleDropdown,
} from "../../redux/room/room.actions";
import { connect } from "react-redux";

const ChatroomDropdown = ({ setToggleDelete, setToggleDropdown }) => (
  <div className="chatroom-dropdown-container">
    <li
      onClick={() => {
        setToggleDropdown();
        setToggleDelete();
      }}
    >
      delete room
    </li>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  setToggleDelete: () => dispatch(setToggleDelete()),
  setToggleDropdown: () => dispatch(setToggleDropdown()),
});

export default connect(null, mapDispatchToProps)(ChatroomDropdown);
