import {
  BASE_URL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  GET_USER,
} from "@src/constants";
import { clientRequest, clientRequestWithToken } from "../utils/axioWrapper";
import { asynActionWithToken } from "./actionHelper";

export const login = (username, password) => (dispatch, getState) =>
  clientRequest({
    method: "post",
    url: "/login/",
    data: JSON.stringify({ username, password }),
  })
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL, payload: err.data });
    });

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT,
  });
};

export const getUser = (userid) =>
  asynActionWithToken((dispatch, getState) =>
    clientRequestWithToken({
      method: "get",
      url: "/users/" + userid,
    }).then((res) => {
      dispatch({ type: GET_USER, payload: res });
    })
  );

export const signup = (username, password, img) => (dispatch, getState) =>
  clientRequest({
    method: "post",
    url: "/users/",
    data: JSON.stringify({ username, password, img }),
  })
    .then((res) => {
      dispatch({ type: SIGN_UP_SUCCESS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: SIGN_UP_FAIL, payload: err.data });
    });

export const signupFail = (msg) => (dispatch, getState) => {
  dispatch({
    type: SIGN_UP_FAIL,
    payload: msg,
  });
};
