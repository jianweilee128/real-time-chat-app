import React from "react";
import { Redirect } from "react-router-dom";
import "./options-dropdown.scss";
import {
  setToggleDropdown,
  deleteRoom,
  setCurrentRoom,
} from "../../redux/room/room.actions";
import { logout } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const OptionsDropdown = ({
  setToggleDropdown,
  logout,
  currentRoom,
  socketRef,
  deleteRoom,
  setCurrentRoom,
  userInRoom,
}) => {
  const handleLogout = () => {
    logout();
    return <Redirect to="/" />;
  };
  const deleteRoomSocket = () => {
    socketRef.current.emit("room-delete", currentRoom[1]);
  };

  const leaveRoom = () => {
    socketRef.current.emit("leave-room", currentRoom[1]);
  };

  return (
    <div className="nav-setting-dropdown-container">
      {userInRoom ? (
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
      ) : null}
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
});

const mapStateToProps = (state) => {
  return {
    currentRoom: state.room.currentRoom,
    userInRoom: state.room.userInRoom,
    isAuthenticated: state.user.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsDropdown);
