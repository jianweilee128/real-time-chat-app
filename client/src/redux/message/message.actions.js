import MessageActionTypes from "./message.types";
import axios from "axios";

export const fetchMessages = (room) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: "/api/v1/messages",
      data: {
        room: room,
      },
    })
      .then((res) => {
        const messages = res.data.messages;
        dispatch(fetchMessagesSuccess(messages));
      })
      .catch((err) => dispatch(fetchMessagesFailure(err.message)));
  };
};
export const fetchMessagesSuccess = (messages) => {
  return {
    type: MessageActionTypes.FETCH_MESSAGES_SUCCESS,
    payload: messages,
  };
};
export const fetchMessagesFailure = (err) => {
  return {
    type: MessageActionTypes.FETCH_MESSAGES_FAILURE,
    payload: err,
  };
};
export const addMessageList = (messageItem) => {
  return {
    type: MessageActionTypes.ADD_MESSAGE_LIST,
    payload: messageItem,
  };
};
