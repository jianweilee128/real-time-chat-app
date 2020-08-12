import axios from "axios";
import RoomActionTypes from "./room.types";

export const setCurrentRoom = (room) => ({
  type: RoomActionTypes.SET_CURRENT_ROOM,
  payload: room,
});

export const getRoomList = (userId) => {
  const request = axios({
    method: "get",
    url: `/api/v1/rooms/${userId}`,
  })
    .then((res) => res.data)
    .catch(() => alert("Error in getting messages!"));

  return {
    type: RoomActionTypes.GET_ALL_ROOMS,
    payload: request,
  };
};

export const addRoomList = (roomToJoin) => {
  return {
    type: RoomActionTypes.ADD_ROOM_LIST,
    payload: roomToJoin,
  };
};
export const setRoomList = (roomList) => {
  return {
    type: RoomActionTypes.SET_ROOM_LIST,
    payload: roomList,
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
