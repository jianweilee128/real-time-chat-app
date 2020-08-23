import React, { useState, useEffect, useRef } from "react";
import "./chat-view.scss";
import NavigationBar from "../../components/navigation-bar/navigation-bar.component";
import ChatCard from "../../components/chat-card/chat-card.component";
import UpdateProfile from "../../components/update-profile/update-profile.component";
import OptionsPopup from "../../components/options-popup/options-popup.component";
import {
  addMessageList,
  fetchMessages,
} from "../../redux/message/message.actions";
import { addRoomList } from "../../redux/room/room.actions";
import { setToggleDropdown } from "../../redux/room/room.actions";
import OptionsDropdown from "../../components/options-dropdown/options-dropdown.component";
import { ReactComponent as SettingsIcon } from "../../resources/img/settings.svg";
import { connect } from "react-redux";
import io from "socket.io-client";

const ChatView = ({
  user,
  messageList,
  setMessageList,
  addMessageList,
  currentRoom,
  toggleOptionsPopup,
  setToggleDropdown,
  toggleDropdown,
  isUpdateProfile,
  addRoomList,
  userInRoom,
  fetchMessages,
}) => {
  const [message, setMessage] = useState("");
  const server = "http://localhost:5000/";
  const socketRef = useRef();
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messageList, addMessageList]);

  useEffect(() => {
    socketRef.current = io.connect(server);
  }, [server]);

  useEffect(() => {
    socketRef.current.on("room-create-success", (res) => {
      addRoomList(res);
    });
    socketRef.current.on("input-message-receive", (res) => {
      addMessageList(res);
    });
    socketRef.current.on("room-join-success", (res) => {
      addRoomList(res);
    });
  }, [addMessageList, addRoomList]);

  useEffect(() => {
    fetchMessages(currentRoom[1]);
  }, [currentRoom, fetchMessages]);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    socketRef.current.emit("input-message-emit", {
      message: message,
      sender: user._id,
      room: currentRoom[1],
    });
    document.getElementById("chatroom-text-input").value = "";
  };

  return (
    <div className="chat-view-container">
      <div className="left-view-container">
        <NavigationBar socketRef={socketRef} />
      </div>
      <div className="right-view-container">
        <div className="chatroom-options">
          {userInRoom ? (
            <React.Fragment>
              <h5>{currentRoom[0]}</h5>
              <h5>{`Room ID: ${currentRoom[1]}`}</h5>
            </React.Fragment>
          ) : null}
          <div className="settings-icon">
            <SettingsIcon onClick={() => setToggleDropdown()} />
            {toggleDropdown ? <OptionsDropdown socketRef={socketRef} /> : null}
          </div>
        </div>
        {isUpdateProfile ? (
          <UpdateProfile />
        ) : (
          <React.Fragment>
            <div className="chatroom-screen">
              {messageList.map((data) => (
                <ChatCard
                  key={data._id}
                  sender={data.sender.name}
                  text={data.message}
                  timestamp={data.timestamp}
                />
              ))}
              <div ref={endRef} />
            </div>
            {userInRoom ? (
              <div className="chatroom-input">
                <input
                  type="text"
                  className="chatroom-text-input"
                  id="chatroom-text-input"
                  name="chatroom-text-input"
                  placeholder="Write your message..."
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className="submit-button"
                  onClick={(e) => handleInputSubmit(e)}
                >
                  Submit
                </button>
              </div>
            ) : null}
          </React.Fragment>
        )}
      </div>
      {toggleOptionsPopup ? <OptionsPopup socketRef={socketRef} /> : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: (room) => dispatch(fetchMessages(room)),
  addMessageList: (messageItem) => dispatch(addMessageList(messageItem)),
  setToggleDropdown: () => dispatch(setToggleDropdown()),
  addRoomList: (roomToJoin) => dispatch(addRoomList(roomToJoin)),
});

const mapStateToProps = (state) => {
  return {
    messageList: state.message.messageList,
    currentRoom: state.room.currentRoom,
    user: state.user.user,
    toggleDropdown: state.room.toggleDropdown,
    toggleOptionsPopup: state.room.toggleOptionsPopup,
    isUpdateProfile: state.user.isUpdateProfile,
    userInRoom: state.room.userInRoom,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
