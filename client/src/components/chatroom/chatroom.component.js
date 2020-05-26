import React, { useEffect, useState } from "react";
import "./chatroom.scss";
import {
  inputMessageEmit,
  inputMessageReceive,
  joinRoom,
} from "../../utils/socketFunctions";
import ChatCard from "../chat-card/chat-card.component";
import {
  getMessageList,
  addMessageList,
  setMessageList,
} from "../../redux/message/message.actions";
import { connect } from "react-redux";

const handleInputSubmit = (event, message, id, room) => {
  event.preventDefault();

  inputMessageEmit(message, id, room);
  clearTextInputFields();
};

const clearTextInputFields = () => {
  document.getElementById("chatroom-text-input").value = "";
};

const Chatroom = ({
  id,
  messageList,
  addMessageList,
  setMessageList,
  currentRoom,
}) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    getMessageList(currentRoom).payload.then((res) =>
      setMessageList(res.messages)
    );
  }, [currentRoom, setMessageList]);

  useEffect(() => {
    joinRoom(currentRoom);
    inputMessageReceive(messageList, addMessageList);
  }, []); // eslint-disable-line

  return (
    <div className="chatroom-container">
      <div className="chatroom-screen">
        {messageList.map((data) => (
          <ChatCard
            key={data._id}
            sender={data.sender.name}
            text={data.message}
            createdAt={data.createdAt}
          />
        ))}
      </div>
      <div className="chatroom-input">
        <input
          type="text"
          className="chatroom-text-input"
          id="chatroom-text-input"
          name="chatroom-text-input"
          placeholder="Write your message..."
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          className="submit-button"
          onClick={(event) =>
            handleInputSubmit(event, message, id, currentRoom)
          }
        >
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
