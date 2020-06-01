const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");
const roomRouter = require("./routes/roomRoutes");
const ErrorHandler = require("./controllers/errorController");
const connectDB = require("./connectDB");
const AppError = require("./utils/appError");

connectDB();
const app = express();

// PORT to listen
const PORT = process.env.PORT || 5000;

app.use(cors());
// Body parser,reading data from body into req.body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// Global Middleware

// Serve static files
app.use(express.static(path.join(__dirname, "../client/public")));

// Serving static files if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/client/build/index.html"));
  });
}

app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/rooms", roomRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(ErrorHandler);

const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Connect server to listen to port specified
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

const messageController = require("./controllers/messageController");
const roomController = require("./controllers/roomController");
const Room = require("./models/roomModel");
const Message = require("./models/messageModel");

// Socket.io connection to listen to message
io.on("connection", (socket) => {
  console.log("We have a new connection!");

  // Join room
  socket.on("join-room", (room) => {
    socket.join(room);
  });

  // Leave room
  socket.on("leave-room", (room) => {
    socket.leave(room);
  });

  // Receive message from client to server
  socket.on("input-message-emit", async (message, sender, createdAt, room) => {
    const newMessage = await messageController.createMessage(
      message,
      sender,
      createdAt,
      room
    );
    const res = await Message.findById(newMessage._id);
    // Return message from server to client and to specific room
    return io.to(res.room._id).emit("input-message-receive", res);
  });

  socket.on("room-create", async (name, user) => {
    await roomController.createRoom(name, user);

    const res = await Room.find();
    return io.emit("room-create-success", res);
  });

  socket.on("room-delete", async (id) => {
    await roomController.deleteRoom(id);
  });

  socket.on("disconnect", () => {
    console.log("User has left");
  });
});
