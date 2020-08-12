import React from "react";
import { withRouter } from "react-router-dom";
import "./options-dropdown.scss";
import {
  setToggleDropdown,
  deleteRoom,
  setCurrentRoom,
} from "../../redux/room/room.actions";
import { logout, toggleIsAuthenticated } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const OptionsDropdown = ({
  setToggleDropdown,
  history,
  logout,
  currentRoom,
  socketRef,
  deleteRoom,
  setCurrentRoom,
  toggleIsAuthenticated,
}) => {
  const handleLogout = () => {
    logout().payload.then((res) => {
      if (res.data.status === "success") {
        toggleIsAuthenticated();
        return history.push({
          pathname: "/",
        });
      }
    });
  };

  const deleteRoomSocket = () => {
    socketRef.current.emit("room-delete", currentRoom[1]);
  };

  const leaveRoom = () => {
    socketRef.current.emit("leave-room", currentRoom[1]);
  };

  return (
    <div className="nav-setting-dropdown-container">
      <li
        onClick={() => {
          setToggleDropdown();
          deleteRoom(currentRoom[1]);
          deleteRoomSocket();
          leaveRoom();
          setCurrentRoom([]);
        }}
      >
        delete room
      </li>
      <li className="logout-button" onClick={() => handleLogout()}>
        logout
      </li>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setToggleDropdown: () => dispatch(setToggleDropdown()),
  logout: () => dispatch(logout()),
  deleteRoom: (roomId) => dispatch(deleteRoom(roomId)),
  setCurrentRoom: (room) => dispatch(setCurrentRoom(room)),
  toggleIsAuthenticated: () => dispatch(toggleIsAuthenticated()),
});

const mapStateToProps = (state) => {
  return {
    currentRoom: state.room.currentRoom,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OptionsDropdown)
);
