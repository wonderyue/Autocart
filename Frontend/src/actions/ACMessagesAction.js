import { MESSAGE } from "@src/constants";

export const responseMessage = (msg, status) => {
  return {
    type: MESSAGE,
    payload: { msg, status }
  };
};
