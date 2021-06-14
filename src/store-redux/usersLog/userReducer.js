import { LOG_IN, LOG_OUT } from "./userType";
import Cookies from "js-cookie";

const initialStateLog = Cookies.get("token")
  ? {
      loged: true,
    }
  : {
      loged: false,
    };

const userReducer = (state = initialStateLog, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        loged: true,
      };
    case LOG_OUT:
      return {
        ...state,
        loged: false,
      };

    default:
      return state;
  }
};

export default userReducer;