import React, { useRef } from "react";
import "./nav-room-card.scss";
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

const NavRoomCard = ({
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
    if (toggleDelete === true) {
      setToggleDelete();
    }
  });

  return (
    <div className="nav-room-card-container">
      <span
        className="nav-room-card-text"
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
          className="nav-room-card-options"
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

export default connect(mapStateToProps, mapDispatchToProps)(NavRoomCard);
