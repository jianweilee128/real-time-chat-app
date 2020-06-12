import React, { useState, useEffect } from "react";
import "./navigation-bar.scss";
import NavRoomCard from "../nav-room-card/nav-room-card.component";
import { createRoom, createRoomSuccess } from "../../utils/socketFunctions";
import { getRoomList, setRoomList } from "../../redux/room/room.actions";
import { getOnlineUsers, setUserList } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { setToggleDropdown } from "../../redux/room/room.actions";
import NavSettingDropdown from "../nav-setting-dropdown/nav-setting-dropdown.component";
import { ReactComponent as EditIcon } from "../../resources/img/edit.svg";
import { toggleUpdateProfile } from "../../redux/user/user.actions";

const NavigationBar = ({
  user,
  getRoomList,
  setRoomList,
  roomList,
  toggleDropdown,
  setToggleDropdown,
  getOnlineUsers,
  setUserList,
  userList,
  currentRoom,
  toggleUpdateProfile,
}) => {
  const [roomName, setRoomName] = useState("");
  const [roomsOrUsers, setRoomsOrUsers] = useState("rooms");
  useEffect(() => {
    getRoomList().payload.then((res) => setRoomList(res.rooms));
    getOnlineUsers().payload.then((res) => setUserList(res.users));
    createRoomSuccess(setRoomList);
  }, []); // eslint-disable-line

  const handleRoomCreate = (e) => {
    e.preventDefault();
    createRoom(roomName, user._id);
    document.getElementById("create-room-input").value = "";
  };

  const checkRoomsOrUsers = () => {
    if (roomsOrUsers === "rooms" && roomList) {
      return roomList.map((room) => (
        <NavRoomCard room={room.name} key={room._id} id={room._id} />
      ));
    } else if (roomsOrUsers === "users" && userList) {
      return userList.map((user) => (
        <div className="user-list-card" key={user._id}>
          {user.name}
        </div>
      ));
    }
  };

  return (
    <React.Fragment>
      <div className="nav-container">
        {/* Nav Profile */}
        <div className="nav-profile-container">
          <span>{user.name}</span>
          <span className="nav-profile-room">
            {currentRoom[0]
              ? `Currently in: ${currentRoom[0]}`
              : `Not in any room`}
            <div className="edit-icon">
              <EditIcon onClick={() => toggleUpdateProfile()} />
            </div>
          </span>
        </div>
        <div className="nav-menu-container">
          <div className="nav-menu">
            <span onClick={() => setRoomsOrUsers("rooms")}>rooms</span>
          </div>
          <div className="nav-menu">
            <span onClick={() => setRoomsOrUsers("users")}>users</span>
          </div>
          <div className="nav-menu">
            <span onClick={() => setToggleDropdown()}>settings</span>
            {toggleDropdown ? <NavSettingDropdown /> : null}
          </div>
        </div>
        {checkRoomsOrUsers()}
      </div>
      <div className="create-room-container">
        <input
          placeholder="Enter room name to create..."
          type="text"
          className="create-room-input"
          id="create-room-input"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button className="create-button" onClick={(e) => handleRoomCreate(e)}>
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
  toggleUpdateProfile: () => dispatch(toggleUpdateProfile()),
});

const mapStateToProps = (state) => {
  return {
    roomList: state.room.roomList,
    toggleDropdown: state.room.toggleDropdown,
    userList: state.user.userList,
    currentRoom: state.room.currentRoom,
    user: state.user.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
