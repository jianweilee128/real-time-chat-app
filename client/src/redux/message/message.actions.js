import MessageActionTypes from "./message.types";
import axios from "axios";

export const addMessageList = (messageItem) => ({
  type: MessageActionTypes.ADD_MESSAGE_LIST,
  payload: messageItem,
});

export const getMessageList = () => {
  const request = axios({
    method: "get",
    url: "/api/v1/messages",
  })
    .then((res) => res.data)
    .catch(() => console.log("Error in getting messages!"));

  return {
    type: MessageActionTypes.GET_MESSAGE_LIST,
    payload: request,
  };
};

export const setMessageList = (messageList) => {
  return {
    type: MessageActionTypes.SET_MESSAGE_LIST,
    payload: messageList,
  };
};
