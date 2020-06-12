import { createStore } from "redux";
import { persistStore } from "redux-persist";

import persistedReducer from "./root-reducer";

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
