import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import messageReducer from "./message/message.reducer";

export default combineReducers({
  user: userReducer,
  message: messageReducer,
});
