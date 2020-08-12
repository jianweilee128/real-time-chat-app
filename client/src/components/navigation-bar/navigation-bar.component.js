import React, { useEffect } from "react";
import "./navigation-bar.scss";
import NavRoomCard from "../nav-room-card/nav-room-card.component";
import {
  getRoomList,
  setRoomList,
  setToggleOptionsPopup,
} from "../../redux/room/room.actions";
import { connect } from "react-redux";
import { ReactComponent as EditIcon } from "../../resources/img/edit.svg";
import { ReactComponent as AddIcon } from "../../resources/img/add.svg";
import { toggleUpdateProfile } from "../../redux/user/user.actions";

const NavigationBar = ({
  user,
  getRoomList,
  setRoomList,
  roomList,
  currentRoom,
  setToggleOptionsPopup,
  socketRef,
  toggleUpdateProfile,
}) => {
  useEffect(() => {
    getRoomList(user._id).payload.then((res) => {
      setRoomList(res.rooms);
    });
  }, []); // eslint-disable-line

  return (
    <div className="nav-container">
      {/* Nav Profile */}
      <div className="nav-profile-container">
        <h5>{user.name}</h5>
        <h6>{`ID:${user._id}`}</h6>
        <span className="nav-profile-room">
          {currentRoom[0]
            ? `Currently in: ${currentRoom[0]}`
            : `Not in any room`}
          <div className="edit-icon">
            <EditIcon onClick={() => toggleUpdateProfile()} />
          </div>
        </span>
      </div>
      {/* Nav Settings & Rooms View */}
      <div className="nav-menu-container">
        <div className="nav-menu rooms">
          <span>rooms</span>
        </div>
        <div className="nav-menu add-icon">
          <AddIcon onClick={() => setToggleOptionsPopup()} />
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
  getRoomList: (userId) => dispatch(getRoomList(userId)),
  setRoomList: (roomList) => dispatch(setRoomList(roomList)),
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
