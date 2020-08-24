import RoomActionTypes from "./room.types";

const INITIAL_STATE = {
  loadingRoomsSuccess: true,
  currentRoom: [],
  roomList: [],
  toggleDropdown: false,
  toggleOptionsPopup: false,
  userInRoom: false,
  err: "",
  sideMenuOpen: true,
};

const roomReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RoomActionTypes.SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.payload,
      };
    case RoomActionTypes.FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        loadingRoomsSuccess: true,
        roomList: action.payload,
      };
    case RoomActionTypes.FETCH_ROOMS_FAILURE:
      return {
        ...state,
        loadingRoomsSuccess: false,
        err: action.payload,
      };
    case RoomActionTypes.ADD_ROOM_LIST:
      return {
        ...state,
        roomList: state.roomList.concat(action.payload),
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
    case RoomActionTypes.SET_TOGGLE_OPTIONS_POPUP:
      return {
        ...state,
        toggleOptionsPopup: !state.toggleOptionsPopup,
      };
    case RoomActionTypes.TOGGLE_USER_IN_ROOM:
      return {
        ...state,
        userInRoom: !state.userInRoom,
      };
    case RoomActionTypes.TOGGLE_SIDE_MENU:
      return {
        ...state,
        sideMenuOpen: !state.sideMenuOpen,
      };
    default:
      return state;
  }
};

export default roomReducer;
