import io from "socket.io-client";
let server = "http://localhost:5000/";

const socket = io(server);

export const inputMessageEmit = (message, id) => {
  socket.emit("input-message-emit", {
    message: message,
    sender: id,
    createdAt: new Date().toLocaleString(),
  });
};

export const inputMessageReceive = (messageList, setMessageList) => {
  socket.on("input-message-receive", (doc) => {
    setMessageList(messageList.concat(doc));
  });
};
