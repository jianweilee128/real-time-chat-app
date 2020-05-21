import React, { useEffect, useState } from "react";
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

const handleInputSubmit = (message, id) => {
  inputMessageEmit(message, id);
  clearTextInputFields();
};

const clearTextInputFields = () => {
  document.getElementById("chatroom-text-input").value = "";
};

const Chatroom = ({ id, messageList, addMessageList, setMessageList }) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    getMessageList().payload.then((res) => setMessageList(res.messages));
    inputMessageReceive(messageList, addMessageList);
  }, []);
  return (
    <div className="chatroom-container">
      <div className="chatroom-screen">
        {messageList.map((data) => (
          <ChatCard
            key={`${data.sender._id}${data._id}`}
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
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="submit-button"
          onClick={() => handleInputSubmit(message, id)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getMessageList: () => dispatch(getMessageList()),
  addMessageList: (messageItem) => dispatch(addMessageList(messageItem)),
  setMessageList: (messageList) => dispatch(setMessageList(messageList)),
});

const mapStateToProps = (state) => {
  return {
    messageList: state.message.messageList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
