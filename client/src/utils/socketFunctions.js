import io from "socket.io-client";
let server = "http://localhost:5000/";

const socket = io.connect(server);

export const inputMessageEmit = (message, id, room) => {
  socket.emit("input-message-emit", {
    message: message,
    sender: id,
    room: room,
  });
};

export const inputMessageReceive = (messageList, setMessageList) => {
  socket.on("input-message-receive", (res) => {
    setMessageList(messageList.concat(res));
  });
};

export const createRoom = (name, user) => {
  socket.emit("room-create", {
    name: name,
    user: user,
  });
};
export const deleteRoomSocket = (id) => {
  socket.emit("room-delete", id);
};

export const createRoomSuccess = (setRoomList) => {
  socket.on("room-create-success", (res) => {
    setRoomList(res);
  });
};
export const joinRoom = (room) => {
  socket.emit("join-room", room);
};
export const leaveRoom = (room) => {
  socket.emit("leave-room", room);
};
