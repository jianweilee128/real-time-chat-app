import MessageActionTypes from "./message.types";

const INITIAL_STATE = {
  message: "",
  messageList: [],
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MessageActionTypes.ADD_MESSAGE_LIST:
      return {
        ...state,
        messageList: state.messageList.concat(action.payload),
      };
    case MessageActionTypes.GET_MESSAGE_LIST:
      return {
        ...state,
        messageList: action.payload,
      };
    case MessageActionTypes.SET_MESSAGE_LIST:
      return {
        ...state,
        messageList: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
