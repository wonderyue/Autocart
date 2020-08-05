import { SET_TOKEN, NEED_LOGIN } from "@src/constants";
import { clientRequest } from "@src/utils/axioWrapper";

const THRESHOLD = 5;

export const requestMiddleware = store => next => action => {
  const { request } = action;
  if (!request) {
    return next(action);
  }
  const { refreshToken, expire, refreshExpire } = store.getState().Auth;
  const now = new Date().getTime() / 1000 + THRESHOLD;
  if (refreshToken && now > refreshExpire) {
    return { type: NEED_LOGIN };
  }
  if (refreshToken && now > expire) {
    return clientRequest({
      method: "post",
      url: "/token/refresh/",
      data: JSON.stringify({ refresh: refreshToken })
    })
      .then(res => {
        store.dispatch({ type: SET_TOKEN, payload: res });
        request(store.dispatch, store.getState);
      })
      .catch(err => {
        if (err.status == 401) {
          store.dispatch({ type: NEED_LOGIN });
        }
      });
  }
  return request(store.dispatch, store.getState);
};
