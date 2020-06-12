import React, { useEffect, useState, useRef } from "react";
import "./chatroom.scss";
import {
  inputMessageEmit,
  inputMessageReceive,
} from "../../utils/socketFunctions";
import ChatCard from "../chat-card/chat-card.component";
import {
  getMessageList,
  addMessageList,
  setMessageList,
} from "../../redux/message/message.actions";
import { connect } from "react-redux";

const Chatroom = ({
  user,
  messageList,
  addMessageList,
  setMessageList,
  currentRoom,
}) => {
  const [message, setMessage] = useState("");
  const endRef = useRef();
  const scrollToBottom = () => {
    endRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    inputMessageEmit(message, user._id, currentRoom[1]);
    document.getElementById("chatroom-text-input").value = "";
  };

  useEffect(() => {
    getMessageList(currentRoom[1]).payload.then((res) => {
      setMessageList(res.messages);
    });
  }, [currentRoom, setMessageList]);

  useEffect(() => {
    inputMessageReceive(messageList, addMessageList);
  }, []); // eslint-disable-line

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div className="chatroom-container">
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
      <div className="chatroom-input">
        <input
          type="text"
          className="chatroom-text-input"
          id="chatroom-text-input"
          name="chatroom-text-input"
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="submit-button" onClick={(e) => handleInputSubmit(e)}>
          Submit
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getMessageList: (room) => dispatch(getMessageList(room)),
  addMessageList: (messageItem) => dispatch(addMessageList(messageItem)),
  setMessageList: (messageList) => dispatch(setMessageList(messageList)),
});

const mapStateToProps = (state) => {
  return {
    messageList: state.message.messageList,
    currentRoom: state.room.currentRoom,
    user: state.user.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
