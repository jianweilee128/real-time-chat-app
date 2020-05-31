import axios from "axios";
import RoomActionTypes from "./room.types";

export const setCurrentRoom = (room) => ({
  type: RoomActionTypes.SET_CURRENT_ROOM,
  payload: room,
});

export const getRoomList = () => {
  const request = axios({
    method: "get",
    url: "/api/v1/rooms",
  })
    .then((res) => res.data)
    .catch(() => console.log("Error in getting messages!"));

  return {
    type: RoomActionTypes.GET_ALL_ROOMS,
    payload: request,
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

export const setToggleDelete = () => {
  return {
    type: RoomActionTypes.SET_TOGGLE_DELETE,
  };
};
