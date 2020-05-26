import React from "react";
import "./chatroom-card.scss";
import { setCurrentRoom } from "../../redux/room/room.actions";
import { joinRoom, leaveRoom } from "../../utils/socketFunctions";

import { connect } from "react-redux";

const ChatroomCard = ({ room, currentRoom, setCurrentRoom }) => {
  return (
    <div
      className="chatroom-card-container"
      onClick={() => {
        leaveRoom(currentRoom);
        joinRoom(room);
        setCurrentRoom(room);
      }}
    >
      <span className="chatroom-card-text">{room}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomCard);
