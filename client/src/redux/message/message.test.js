import * as actions from "./message.actions";
import messageReducer from "./message.reducer";
import MessageActionTypes from "./message.types";

describe("message actions", () => {
  it("should create an action to add a messageItem to the messageList", () => {
    const messageItem = {
      message: "Hey",
      sender: "JohnDoe",
      timestamp: "1 Jan 2020",
    };
    const expectedAction = {
      type: MessageActionTypes.ADD_MESSAGE_LIST,
      payload: messageItem,
    };
    expect(actions.addMessageList(messageItem)).toEqual(expectedAction);
  });
  it("should create an action to set the messageList to when fetching messages succeeds", () => {
    const messageList = [
      {
        message: "Hey",
        sender: "JohnDoe",
        timestamp: "10.37pm",
      },
      {
        message: "Hi",
        sender: "JaneDoe",
        timestamp: "10.38pm",
      },
    ];
    const expectedAction = {
      type: MessageActionTypes.FETCH_MESSAGES_SUCCESS,
      payload: messageList,
    };
    expect(actions.fetchMessagesSuccess(messageList)).toEqual(expectedAction);
  });
});

describe("message reducer", () => {
  it("should return the initial state", () => {
    expect(messageReducer(undefined, {})).toEqual({
      loadingMessagesSuccess: true,
      messageList: [],
      err: "",
    });
  });

  it("should handle FETCH_MESSAGES_SUCCESS", () => {
    const messageList = [
      {
        message: "Hey",
        sender: "JohnDoe",
        timestamp: "10.37pm",
      },
      {
        message: "Hi",
        sender: "JaneDoe",
        timestamp: "10.38pm",
      },
    ];
    expect(
      messageReducer([], {
        type: MessageActionTypes.FETCH_MESSAGES_SUCCESS,
        payload: messageList,
      })
    ).toEqual({
      messageList: messageList,
      loadingMessagesSuccess: true,
    });
  });

  it("should handle FETCH_MESSAGES_FAILURE", () => {
    const err = "mock error message";
    expect(
      messageReducer([], {
        type: MessageActionTypes.FETCH_MESSAGES_FAILURE,
        payload: err,
      })
    ).toEqual({
      err: err,
      loadingMessagesSuccess: false,
    });
  });
});
