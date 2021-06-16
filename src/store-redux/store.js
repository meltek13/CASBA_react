import { createStore, combineReducers } from "redux";
import userReducer from "./usersLog/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

const Store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;
