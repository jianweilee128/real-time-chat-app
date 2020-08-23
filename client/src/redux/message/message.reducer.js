import MessageActionTypes from "./message.types";

const INITIAL_STATE = {
  loadingMessagesSuccess: true,
  messageList: [],
  err: "",
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MessageActionTypes.ADD_MESSAGE_LIST:
      return {
        ...state,
        messageList: state.messageList.concat(action.payload),
      };
    case MessageActionTypes.FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        loadingMessagesSuccess: true,
        messageList: action.payload,
      };
    case MessageActionTypes.FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        loadingMessagesSuccess: false,
        err: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
