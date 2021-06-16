import { createStore, combineReducers } from "redux";
import userReducer from "./usersLog/userReducer";
import flatReducer from "./flatLog/flatReducer";

const rootReducer = combineReducers({
  user: userReducer,
  flat: flatReducer,
});

const Store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;
