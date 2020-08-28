import React, { useRef } from "react";
import { connect } from "react-redux";
import { ReactComponent as CloseIcon } from "../../resources/img/close.svg";
import { setToggleOptionsPopup } from "../../redux/room/room.actions";
import "./options-popup.scss";

const OptionsPopup = ({ user, socketRef, setToggleOptionsPopup }) => {
  const roomNameRef = useRef();
  const joinRoomIdRef = useRef();

  const handleRoomCreate = () => {
    socketRef.current.emit("room-create", {
      name: roomNameRef.current.value,
      userId: user._id,
    });
    roomNameRef.current.value = "";
  };

  const joinRoom = () => {
    socketRef.current.emit("room-join", {
      roomId: joinRoomIdRef.current.value,
      userId: user._id,
    });
    joinRoomIdRef.current.value = "";
  };

  return (
    <div className="popup-container">
      <div className="popup-inner">
        <div className="close-icon" onClick={() => setToggleOptionsPopup()}>
          <CloseIcon />
        </div>
        <div className="options-popup-container">
          <h2>join room</h2>
          <input
            ref={joinRoomIdRef}
            placeholder="Enter room id to join..."
            type="text"
            className="options-popup-input"
            id="join-room-input"
          />
          <div className="options-popup-button" onClick={() => joinRoom()}>
            join room
          </div>
        </div>
        <div className="options-popup-container room-create">
          <h2>room create</h2>
          <input
            ref={roomNameRef}
            placeholder="Enter room name to create..."
            type="text"
            className="options-popup-input"
            id="create-room-input"
          />
          <div
            className="options-popup-button"
            onClick={() => handleRoomCreate()}
          >
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
