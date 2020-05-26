import io from "socket.io-client";
let server = "http://localhost:5000/";

const socket = io.connect(server);

export const inputMessageEmit = (message, id, room) => {
  socket.emit("input-message-emit", {
    message: message,
    sender: id,
    createdAt: new Date().toLocaleString(),
    room: room,
  });
};

export const inputMessageReceive = (messageList, setMessageList) => {
  socket.on("input-message-receive", (doc) => {
    setMessageList(messageList.concat(doc));
  });
};

export const joinRoom = (room) => {
  socket.emit("join-room", room);
};
export const leaveRoom = (room) => {
  socket.emit("leave-room", room);
};
