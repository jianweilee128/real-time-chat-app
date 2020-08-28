import React, { useEffect, useRef } from "react";
import "./chat-view.scss";
import NavigationBar from "../../components/navigation-bar/navigation-bar.component";
import ChatCard from "../../components/chat-card/chat-card.component";
import UpdateProfile from "../../components/update-profile/update-profile.component";
import OptionsPopup from "../../components/options-popup/options-popup.component";
import {
  addMessageList,
  fetchMessages,
} from "../../redux/message/message.actions";
import { addRoomList, toggleSideMenu } from "../../redux/room/room.actions";
import { setToggleDropdown } from "../../redux/room/room.actions";
import OptionsDropdown from "../../components/options-dropdown/options-dropdown.component";
import { ReactComponent as SettingsIcon } from "../../resources/img/settings.svg";
import { ReactComponent as MenuIcon } from "../../resources/img/menu.svg";
import { connect } from "react-redux";
import io from "socket.io-client";

const ChatView = ({
  user,
  messageList,
  addMessageList,
  currentRoom,
  toggleOptionsPopup,
  setToggleDropdown,
  toggleDropdown,
  toggleSideMenu,
  isUpdateProfile,
  sideMenuOpen,
  addRoomList,
  userInRoom,
  fetchMessages,
}) => {
  const serverUrl = "/";
  const messageRef = useRef();
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
    socketRef.current = io.connect(serverUrl);
  }, [serverUrl]);

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

  const handleInputSubmit = () => {
    let message = messageRef.current.value;
    socketRef.current.emit("input-message-emit", {
      message: message,
      sender: user._id,
      room: currentRoom[1],
    });
    message = "";
  };

  return (
    <div className="chat-view-container">
      {sideMenuOpen ? (
        <div className="left-view-container">
          <NavigationBar socketRef={socketRef} />
        </div>
      ) : null}
      <div className="right-view-container">
        <div className="chatroom-options">
          <MenuIcon className="menu-icon" onClick={() => toggleSideMenu()} />
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
                  ref={messageRef}
                  type="text"
                  className="chatroom-text-input"
                  id="chatroom-text-input"
                  name="chatroom-text-input"
                  placeholder="Write your message..."
                />
                <div
                  className="submit-button"
                  onClick={() => handleInputSubmit()}
                >
                  Submit
                </div>
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
  toggleSideMenu: () => dispatch(toggleSideMenu()),
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
    sideMenuOpen: state.room.sideMenuOpen,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
