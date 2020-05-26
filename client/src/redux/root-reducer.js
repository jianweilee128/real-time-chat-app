import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import messageReducer from "./message/message.reducer";
import roomReducer from "./room/room.reducer";

export default combineReducers({
  user: userReducer,
  message: messageReducer,
  room: roomReducer,
});
