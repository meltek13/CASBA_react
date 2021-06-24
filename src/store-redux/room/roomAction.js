import { roomConnect, roomDisconnect } from "./roomType";

export const connect = () => {
  return {
    type: roomConnect,
  };
};

export const disconnect = () => {
  return {
    type: roomDisconnect,
  };
};
