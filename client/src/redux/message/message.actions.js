import MessageActionTypes from "./message.types";
import axios from "axios";

export const getMessageList = (room) => {
  const request = axios({
    method: "post",
    url: "/api/v1/messages",
    data: {
      room: room,
    },
  })
    .then((res) => res.data)
    .catch(() => alert("Error in getting messages!"));

  return {
    type: MessageActionTypes.GET_MESSAGE_LIST,
    payload: request,
  };
};

export const addMessageList = (messageItem) => ({
  type: MessageActionTypes.ADD_MESSAGE_LIST,
  payload: messageItem,
});

export const setMessageList = (messageList) => {
  return {
    type: MessageActionTypes.SET_MESSAGE_LIST,
    payload: messageList,
  };
};
