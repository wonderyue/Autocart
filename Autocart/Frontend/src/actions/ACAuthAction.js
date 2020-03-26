import axios from "axios";

import {
  BASE_URL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  GET_USER,
  GET_CART
} from "@src/constants";

export const login = (username, password) => (dispatch, getState) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const data = JSON.stringify({ username, password });
  axios
    .post(`${BASE_URL}/login/`, data, config)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data });
    });
};

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT
  });
};

export const getUser = userid => (dispatch, getState) => {
  axios
    .get(`${BASE_URL}/users/${userid}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: GET_USER, payload: res.data });
    })
    .catch(err => {
      alert(err);
    });
};

export const signup = (username, password, img) => (dispatch, getState) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const data = JSON.stringify({ username, password, img });
  axios
    .post(`${BASE_URL}/users/`, data, config)
    .then(res => {
      dispatch({ type: SIGN_UP_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SIGN_UP_FAIL, payload: err.response.data });
    });
};

export const signupFail = msg => (dispatch, getState) => {
  dispatch({
    type: SIGN_UP_FAIL,
    payload: msg
  });
};

export const getCart = () => (dispatch, getState) => {
  axios
    .get(`${BASE_URL}/carts/`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: GET_CART, payload: res.data });
    })
    .catch(err => {
      alert(err);
    });
};

export const tokenConfig = getState => {
  const token = getState().Auth.token;
  const config = { headers: { "Content-Type": "application/json" } };
  if (token) {
    config.headers["Authorization"] = `JWT ${token}`;
  }
  return config;
};
