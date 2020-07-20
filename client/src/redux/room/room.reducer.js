import RoomActionTypes from "./room.types";

const INITIAL_STATE = {
  currentRoom: [],
  roomList: [],
  toggleDropdown: false,
  toggleDelete: false,
};

const roomReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RoomActionTypes.SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.payload,
      };
    case RoomActionTypes.GET_ALL_ROOMS:
      return state;
    case RoomActionTypes.SET_ROOM_LIST:
      return {
        ...state,
        roomList: action.payload,
      };
    case RoomActionTypes.DELETE_ROOM:
      return {
        ...state,
        roomList: state.roomList.filter((item) => item._id !== action.payload),
      };
    case RoomActionTypes.SET_TOGGLE_DROPDOWN:
      return {
        ...state,
        toggleDropdown: !state.toggleDropdown,
      };

    case RoomActionTypes.SET_TOGGLE_DELETE:
      return {
        ...state,
        toggleDelete: !state.toggleDelete,
      };
    default:
      return state;
  }
};

export default roomReducer;