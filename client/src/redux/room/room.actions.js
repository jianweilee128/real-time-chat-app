import axios from "axios";
import RoomActionTypes from "./room.types";

export const setCurrentRoom = (room) => ({
  type: RoomActionTypes.SET_CURRENT_ROOM,
  payload: room,
});

export const fetchRoomList = (userId) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: `/api/v1/rooms/${userId}`,
    })
      .then((res) => {
        const rooms = res.data.rooms;
        dispatch(fetchRoomsSuccess(rooms));
      })
      .catch((err) => dispatch(fetchRoomsFailure(err.message)));
  };
};

export const fetchRoomsSuccess = (rooms) => {
  return {
    type: RoomActionTypes.FETCH_ROOMS_SUCCESS,
    payload: rooms,
  };
};
export const fetchRoomsFailure = (err) => {
  return {
    type: RoomActionTypes.FETCH_ROOMS_FAILURE,
    payload: err,
  };
};
export const addRoomList = (roomToJoin) => {
  return {
    type: RoomActionTypes.ADD_ROOM_LIST,
    payload: roomToJoin,
  };
};

export const deleteRoom = (roomId) => {
  return {
    type: RoomActionTypes.DELETE_ROOM,
    payload: roomId,
  };
};

export const setToggleDropdown = () => {
  return {
    type: RoomActionTypes.SET_TOGGLE_DROPDOWN,
  };
};
export const setToggleOptionsPopup = () => {
  return {
    type: RoomActionTypes.SET_TOGGLE_OPTIONS_POPUP,
  };
};

export const toggleUserInRoom = () => {
  return {
    type: RoomActionTypes.TOGGLE_USER_IN_ROOM,
  };
};
export const toggleSideMenu = () => {
  return {
    type: RoomActionTypes.TOGGLE_SIDE_MENU,
  };
};
