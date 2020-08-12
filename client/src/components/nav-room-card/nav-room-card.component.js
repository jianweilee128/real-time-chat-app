import React from "react";
import "./nav-room-card.scss";
import { setCurrentRoom } from "../../redux/room/room.actions";

import { connect } from "react-redux";

const NavRoomCard = ({
  room,
  roomId,
  currentRoom,
  setCurrentRoom,
  socketRef,
}) => {
  const joinRoom = () => {
    socketRef.current.emit("join-room", roomId);
  };
  const leaveRoom = () => {
    socketRef.current.emit("leave-room", currentRoom[1]);
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
});

const mapStateToProps = (state) => {
  return {
    currentRoom: state.room.currentRoom,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavRoomCard);
