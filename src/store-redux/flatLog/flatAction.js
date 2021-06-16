import { FLAT_ON, FLAT_OFF } from "./flatType";

export const flatOn = () => {
  return {
    type: FLAT_ON,
  };
};

export const flatOff = () => {
  return {
    type: FLAT_OFF,
  };
};
