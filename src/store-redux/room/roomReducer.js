import { roomConnect, roomDisconnect } from "./roomType";
import Cookies from "js-cookie";

const initialStateLog = Cookies.get('flat_id')
? {
  connect: true,
}
: {
  connect: false,
};
  
    

const room = (state = initialStateLog, action) => {
  switch (action.type) {
    case roomConnect:
      return {
        ...state,
        connect: true,
      };
    case roomDisconnect:
      return {
        ...state,
        connect: false,
      };

    default:
      return state;
  }
};

export default room;