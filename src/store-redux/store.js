import { createStore, combineReducers } from "redux";
import userReducer from "./usersLog/userReducer";
import roomReducer from './room/roomReducer'

const Reducer = combineReducers({
  user: userReducer,
  room:  roomReducer
});

// const roomReducer = combineReducers({
//   room:  roomReduc,
// });

const Store = createStore(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;
