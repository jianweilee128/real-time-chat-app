import React, { useState } from "react";
import { connect } from "react-redux";
import { ReactComponent as CloseIcon } from "../../resources/img/close.svg";
import { setToggleOptionsPopup } from "../../redux/room/room.actions";
import "./options-popup.scss";

const OptionsPopup = ({ user, socketRef, setToggleOptionsPopup }) => {
  const [roomName, setRoomName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const handleRoomCreate = () => {
    socketRef.current.emit("room-create", {
      name: roomName,
      userId: user._id,
    });
    document.getElementById("create-room-input").value = "";
  };

  const joinRoom = () => {
    socketRef.current.emit("room-join", {
      roomId: joinRoomId,
      userId: user._id,
    });
    document.getElementById("join-room-input").value = "";
  };

  return (
    <div className="popup-container">
      <div className="popup-inner">
        <CloseIcon
          className="test-icon"
          onClick={() => setToggleOptionsPopup()}
        />
        <div className="join-room-container">
          <h2>join room</h2>
          <input
            placeholder="Enter room id to join..."
            type="text"
            className="join-room-input"
            id="join-room-input"
            onChange={(e) => setJoinRoomId(e.target.value)}
          />
          <div className="join-room-button" onClick={() => joinRoom()}>
            join room
          </div>
        </div>
        <div className="create-room-container">
          <h2>room create</h2>
          <input
            placeholder="Enter room name to create..."
            type="text"
            className="create-room-input"
            id="create-room-input"
            onChange={(e) => setRoomName(e.target.value)}
          />
          <div className="create-button" onClick={() => handleRoomCreate()}>
            create room
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setToggleOptionsPopup: () => dispatch(setToggleOptionsPopup()),
});
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsPopup);
