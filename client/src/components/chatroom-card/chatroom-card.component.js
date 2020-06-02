import React, { useRef } from "react";
import "./chatroom-card.scss";
import {
  setCurrentRoom,
  setToggleDelete,
  deleteRoom,
} from "../../redux/room/room.actions";
import {
  joinRoom,
  leaveRoom,
  deleteRoomSocket,
} from "../../utils/socketFunctions";
import ListenOutsideClick from "../../utils/listenOutsideClick";

import { connect } from "react-redux";

const ChatroomCard = ({
  room,
  id,
  currentRoom,
  setCurrentRoom,
  setToggleDelete,
  deleteRoom,
  toggleDelete,
}) => {
  const ref = useRef();
  ListenOutsideClick(ref, () => {
    console.log("test");
    if (toggleDelete === true) {
      setToggleDelete();
    }
  });

  return (
    <div className="chatroom-card-container">
      <span
        className="chatroom-card-text"
        onClick={() => {
          leaveRoom(currentRoom);
          joinRoom(id);
          setCurrentRoom([room, id]);
        }}
      >
        {room}
      </span>
      {toggleDelete ? (
        <span
          ref={ref}
          className="chatroom-card-options"
          onClick={() => {
            deleteRoom(id);
            deleteRoomSocket(id);
            setToggleDelete();
          }}
        >
          &#128941;
        </span>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentRoom: (room) => dispatch(setCurrentRoom(room)),
  setToggleDelete: () => dispatch(setToggleDelete()),
  deleteRoom: (roomId) => dispatch(deleteRoom(roomId)),
});

const mapStateToProps = (state) => {
  return {
    currentRoom: state.room.currentRoom,
    toggleDelete: state.room.toggleDelete,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomCard);
