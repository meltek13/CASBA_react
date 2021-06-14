import { createStore } from 'redux';
import userReducer from "./usersLog/userReducer";

const Store = createStore(
    userReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
  export default Store;