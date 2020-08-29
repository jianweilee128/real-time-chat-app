import * as actions from "./room.actions";
import roomReducer from "./room.reducer";
import RoomActionTypes from "./room.types";

describe("room actions", () => {
  it("should create an action to set current room using the room input", () => {
    const mockRoom = [("mockRoom", 123)];
    const expectedAction = {
      type: RoomActionTypes.SET_CURRENT_ROOM,
      payload: mockRoom,
    };
    expect(actions.setCurrentRoom(mockRoom)).toEqual(expectedAction);
  });
  it("should create an action to set roomList on FETCH_ROOMS_SUCCESS", () => {
    const roomList = [
      {
        name: "mockRoom1",
        _id: "123",
      },
      {
        name: "mockRoom2",
        _id: "1234",
      },
    ];

    const expectedAction = {
      type: RoomActionTypes.FETCH_ROOMS_SUCCESS,
      payload: roomList,
    };
    expect(actions.fetchRoomsSuccess(roomList)).toEqual(expectedAction);
  });
  it("should create an action to delete a room from roomList using the roomId input", () => {
    const roomId = "1234";

    const expectedAction = {
      type: RoomActionTypes.DELETE_ROOM,
      payload: roomId,
    };
    expect(actions.deleteRoom(roomId)).toEqual(expectedAction);
  });
  it("should create an action to toggle whether the user is in a room", () => {
    const expectedAction = {
      type: RoomActionTypes.TOGGLE_USER_IN_ROOM,
    };
    expect(actions.toggleUserInRoom()).toEqual(expectedAction);
  });
  it("should create an action to toggle the dropdown component", () => {
    const expectedAction = {
      type: RoomActionTypes.SET_TOGGLE_DROPDOWN,
    };
    expect(actions.setToggleDropdown()).toEqual(expectedAction);
  });
  it("should create an action to toggle the options popup component", () => {
    const expectedAction = {
      type: RoomActionTypes.SET_TOGGLE_OPTIONS_POPUP,
    };
    expect(actions.setToggleOptionsPopup()).toEqual(expectedAction);
  });
});

describe("room reducer", () => {
  it("should return the initial state", () => {
    expect(roomReducer(undefined, {})).toEqual({
      loadingRoomsSuccess: true,
      currentRoom: [],
      roomList: [],
      toggleDropdown: false,
      toggleOptionsPopup: false,
      userInRoom: false,
      err: "",
      sideMenuOpen: true,
    });
  });

  it("should handle setCurrentRoom", () => {
    const mockRoom = [("mockRoom", 123)];
    expect(
      roomReducer([], {
        type: RoomActionTypes.SET_CURRENT_ROOM,
        payload: mockRoom,
      })
    ).toEqual({
      currentRoom: mockRoom,
    });
  });

  it("should handle action FETCH_ROOMS_SUCCESS", () => {
    const mockRoomList = [
      {
        name: "mockRoom1",
        _id: "123",
      },
      {
        name: "mockRoom2",
        _id: "1234",
      },
    ];
    expect(
      roomReducer([], {
        type: RoomActionTypes.FETCH_ROOMS_SUCCESS,
        payload: mockRoomList,
      })
    ).toEqual({
      roomList: mockRoomList,
      loadingRoomsSuccess: true,
    });
  });

  it("should handle TOGGLE_USER_IN_ROOM", () => {
    expect(
      roomReducer([], {
        type: RoomActionTypes.TOGGLE_USER_IN_ROOM,
      })
    ).toEqual({
      userInRoom: true,
    });
  });

  it("should handle SET_TOGGLE_DROPDOWN", () => {
    expect(
      roomReducer([], {
        type: RoomActionTypes.SET_TOGGLE_DROPDOWN,
      })
    ).toEqual({
      toggleDropdown: true,
    });
  });
  it("should handle SET_TOGGLE_OPTIONS_POPUP", () => {
    expect(
      roomReducer([], {
        type: RoomActionTypes.SET_TOGGLE_OPTIONS_POPUP,
      })
    ).toEqual({
      toggleOptionsPopup: true,
    });
  });
});
