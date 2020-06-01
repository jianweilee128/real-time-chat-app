import React, { useState, useEffect } from "react";
import "./chatroom-list.scss";
import ChatroomCard from "../chatroom-card/chatroom-card.component";
import { createRoom, createRoomSuccess } from "../../utils/socketFunctions";
import { getRoomList, setRoomList } from "../../redux/room/room.actions";
import { getOnlineUsers, setUserList } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { setToggleDropdown } from "../../redux/room/room.actions";
import ChatroomDropdown from "../chatroom-dropdown/chatroom-dropdown.component";

const handleRoomCreate = (e, roomName, id) => {
  e.preventDefault();
  createRoom(roomName, id);
  document.getElementById("create-room-input").value = "";
};

const checkRoomsOrUsers = (roomsOrUsers, roomList, userList) => {
  if (roomsOrUsers === "rooms" && roomList) {
    return roomList.map((room) => (
      <ChatroomCard room={room.name} key={room._id} id={room._id} />
    ));
  } else if (roomsOrUsers === "users" && userList) {
    return userList.map((user) => (
      <div className="user-list-card" key={user._id}>
        {user.name}
      </div>
    ));
  }
};

const ChatroomList = ({
  id,
  getRoomList,
  setRoomList,
  roomList,
  toggleDropdown,
  setToggleDropdown,
  getOnlineUsers,
  setUserList,
  userList,
}) => {
  const [roomName, setRoomName] = useState("");
  const [roomsOrUsers, setRoomsOrUsers] = useState("rooms");
  useEffect(() => {
    getRoomList().payload.then((res) => setRoomList(res.rooms));
    getOnlineUsers().payload.then((res) => setUserList(res.users));
    createRoomSuccess(setRoomList);
  }, []); // eslint-disable-line

  return (
    <React.Fragment>
      <div className="chatroom-list-container">
        <h1 className="chatroom-list-header">{roomsOrUsers}</h1>

        <div className="chatroom-list-menu-container">
          <div className="chatroom-list-menu">
            <span onClick={() => setRoomsOrUsers("rooms")}>rooms</span>
          </div>
          <div className="chatroom-list-menu">
            <span onClick={() => setRoomsOrUsers("users")}>users</span>
          </div>
          <div className="chatroom-list-menu">
            <span onClick={() => setToggleDropdown()}>settings</span>
            {toggleDropdown ? <ChatroomDropdown /> : null}
          </div>
        </div>
        {checkRoomsOrUsers(roomsOrUsers, roomList, userList)}
      </div>
      <div className="create-room-container">
        <input
          placeholder="Enter room name to create..."
          type="text"
          className="create-room-input"
          id="create-room-input"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button
          className="create-button"
          onClick={(e) => handleRoomCreate(e, roomName, id)}
        >
          create room
        </button>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getRoomList: () => dispatch(getRoomList()),
  setRoomList: (roomList) => dispatch(setRoomList(roomList)),
  getOnlineUsers: () => dispatch(getOnlineUsers()),
  setToggleDropdown: () => dispatch(setToggleDropdown()),
  setUserList: (userList) => dispatch(setUserList(userList)),
});

const mapStateToProps = (state) => {
  return {
    roomList: state.room.roomList,
    toggleDropdown: state.room.toggleDropdown,
    userList: state.user.userList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomList);
