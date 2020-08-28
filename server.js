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
const jwt = require("jsonwebtoken");

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
if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Express API routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/rooms", roomRouter);

// Serving static files if in production
if (process.env.NODE_ENV === "production") {
  // Set the static folder where all css and js file will be read from
  app.use(express.static(path.join(__dirname, "client/build")));

  // index.html to be serve for all page routes
  app.get("/**", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Global Middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(ErrorHandler);

// Socket.IO
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const Room = require("./models/roomModel");
const User = require("./models/userModel");
const Message = require("./models/messageModel");

// Connect server to listen to port specified
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

// Socket.io connection to listen to message
io.on("connection", (socket) => {
  console.log("We have a new connection!");

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  // Leave room
  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
  });

  // Receive message from client to server
  socket.on("input-message-emit", async ({ message, sender, room }) => {
    const newMessage = await Message.create({
      message: message,
      sender: sender,
      room: room,
    });
    const res = await Message.findById(newMessage._id);
    // Return message from server to client and to specific room

    return io.to(res.room._id).emit("input-message-receive", res);
  });

  socket.on("room-create", async ({ name, userId }) => {
    const room = await Room.create({
      name: name,
      users: [userId],
    });
    return io.emit("room-create-success", room);
  });

  socket.on("room-join", async ({ roomId, userId }) => {
    const room = await Room.findById(roomId).select("+users");
    let userInRoom = false;
    room.users.map((user) => {
      if (userId == user) {
        userInRoom = true;
      }
    });
    if (!userInRoom) {
      room.users.push(userId);
      room.save();
    }
    return io.emit("room-join-success", room);
  });

  socket.on("room-delete", async (roomId) => {
    await Room.findByIdAndDelete(roomId);
    await Message.deleteMany({ room: roomId });
  });

  socket.on("disconnecting", async () => {
    try {
      socket.request.headers.cookie.split(";").map(async (el) => {
        if (el.trim().startsWith("jwt=")) {
          let token = el.split("=")[1];
          const decoded = await jwt.verify(token, process.env.JWT_SECRET);
          await User.findByIdAndUpdate(decoded.id, {
            online: false,
          }).select("+online");
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
