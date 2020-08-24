import React, { useEffect } from "react";
import "./navigation-bar.scss";
import NavRoomCard from "../nav-room-card/nav-room-card.component";
import {
  setToggleOptionsPopup,
  fetchRoomList,
} from "../../redux/room/room.actions";
import { connect } from "react-redux";
import { ReactComponent as EditIcon } from "../../resources/img/edit.svg";
import { ReactComponent as AddIcon } from "../../resources/img/add.svg";
import { toggleUpdateProfile } from "../../redux/user/user.actions";

const NavigationBar = ({
  user,
  roomList,
  currentRoom,
  setToggleOptionsPopup,
  socketRef,
  fetchRoomList,
  toggleUpdateProfile,
}) => {
  useEffect(() => {
    fetchRoomList(user._id);
  }, []); // eslint-disable-line

  return (
    <div className="nav-container">
      {/* Nav Profile */}
      <div className="nav-profile-container">
        <h5>{user.name}</h5>
        <span className="nav-profile-room">
          {currentRoom[0]
            ? `Currently in: ${currentRoom[0]}`
            : `Not in any room`}
          <div className="edit-icon" onClick={() => toggleUpdateProfile()}>
            <EditIcon />
          </div>
        </span>
      </div>
      {/* Nav Settings & Rooms View */}
      <div className="nav-menu-container">
        <div className="nav-menu rooms">
          <span>rooms</span>
        </div>
        <div
          className="nav-menu add-icon"
          onClick={() => setToggleOptionsPopup()}
        >
          <AddIcon />
        </div>
      </div>
      <div className="nav-menu-cards">
        {roomList.map((room) => (
          <NavRoomCard
            room={room.name}
            key={room._id}
            roomId={room._id}
            socketRef={socketRef}
          />
        ))}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchRoomList: (userId) => dispatch(fetchRoomList(userId)),
  setToggleOptionsPopup: () => dispatch(setToggleOptionsPopup()),
  toggleUpdateProfile: () => dispatch(toggleUpdateProfile()),
});

const mapStateToProps = (state) => {
  return {
    roomList: state.room.roomList,
    currentRoom: state.room.currentRoom,
    user: state.user.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
