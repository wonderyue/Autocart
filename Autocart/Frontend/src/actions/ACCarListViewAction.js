import axios from "axios";
import { responseMessage } from "./Messages";

import {
  BASE_URL,
  GET_CARS_LIST,
  CREATE_CAR,
  UPDATE_CAR,
  CHANGE_PAGE
} from "@src/constants";

export const changePage = activePage => (dispatch, getState) => {
  dispatch({
    type: CHANGE_PAGE,
    payload: activePage
  });
  dispatch(getCarsList(getState().CarList.countPerPage, activePage));
};

export const getCarsList = (countPerPage, curPage) => (dispatch, getState) => {
  var offset = countPerPage * (curPage - 1);
  axios
    .get(`${BASE_URL}/cars?limit=${countPerPage}&offset=${offset}`)
    .then(res => {
      dispatch({
        type: GET_CARS_LIST,
        payload: res.data
      });
    })
    .catch(
      err => alert(err)
      // dispatch(responseMessage(err.response.data, err.response.status))
    );
};

export const addCar = car => (dispatch, getState) => {
  axios
    .post(`${BASE_URL}/cars`, car)
    .then(res => {
      // dispatch(responseMessage("success",res.status));
      dispatch({
        type: CREATE_CAR,
        payload: res.data
      });
    })
    .catch(
      err => alert(err)
      // dispatch(responseMessage(err.response.data, err.response.status))
    );
};
