import { FLAT_ON, FLAT_OFF } from "./flatType";

const initialStateFlat = {
  dashboard: false,
};

const flatReducer = (state = initialStateFlat, action) => {
  switch (action.type) {
    case FLAT_ON:
      return {
        ...state,
        dashboard: true,
      };
    case FLAT_OFF:
      return {
        ...state,
        dashboard: false,
      };
    default:
      return state;
  }
};

export default flatReducer;
