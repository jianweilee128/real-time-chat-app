import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import userReducer from "./user/user.reducer";
import messageReducer from "./message/message.reducer";
import roomReducer from "./room/room.reducer";

const userPersistConfig = {
  key: "user",
  storage: sessionStorage,
  blacklist: ["isUpdateProfile"],
};
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  message: messageReducer,
  room: roomReducer,
});

const rootPersistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["user"],
};

export default persistReducer(rootPersistConfig, rootReducer);
