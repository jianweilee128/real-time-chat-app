import React from "react";
import "./nav-room-card.scss";
import {
  setCurrentRoom,
  toggleUserInRoom,
} from "../../redux/room/room.actions";

import { connect } from "react-redux";

const NavRoomCard = ({
  room,
  roomId,
  currentRoom,
  setCurrentRoom,
  socketRef,
  toggleUserInRoom,
}) => {
  const joinRoom = () => {
    socketRef.current.emit("join-room", roomId);
    toggleUserInRoom();
  };
  const leaveRoom = () => {
    if (currentRoom[1]) {
      socketRef.current.emit("leave-room", currentRoom[1]);
      toggleUserInRoom();
    }
  };

  return (
    <div className="nav-room-card-container">
      <span
        className="nav-room-card-text"
        onClick={() => {
          leaveRoom();
          joinRoom();
          setCurrentRoom([room, roomId]);
        }}
      >
        {room}
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentRoom: (room) => dispatch(setCurrentRoom(room)),
  toggleUserInRoom: () => dispatch(toggleUserInRoom()),
});

const mapStateToProps = (state) => {
  return {
    currentRoom: state.room.currentRoom,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavRoomCard);
