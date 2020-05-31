import React, { useState, useEffect } from "react";
import "./chatroom-list.scss";
import ChatroomCard from "../chatroom-card/chatroom-card.component";
import { createRoom, createRoomSuccess } from "../../utils/socketFunctions";
import { getRoomList, setRoomList } from "../../redux/room/room.actions";
import { connect } from "react-redux";
import ChatroomListMenu from "../chatroom-list-menu/chatroom-list-menu.component";

const handleRoomCreate = (e, roomName, id) => {
  e.preventDefault();

  createRoom(roomName, id);
  document.getElementById("create-room-input").value = "";
};

const ChatroomList = ({ id, getRoomList, setRoomList, roomList }) => {
  const [roomName, setRoomName] = useState("");
  useEffect(() => {
    getRoomList().payload.then((res) => setRoomList(res.rooms));
    createRoomSuccess(setRoomList);
  }, []); // eslint-disable-line

  return (
    <React.Fragment>
      <div className="chatroom-list-container">
        <h1>Rooms</h1>
        <ChatroomListMenu />
        {roomList
          ? roomList.map((room) => (
              <ChatroomCard room={room.name} key={room._id} id={room._id} />
            ))
          : null}
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
});

const mapStateToProps = (state) => {
  return {
    roomList: state.room.roomList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomList);
