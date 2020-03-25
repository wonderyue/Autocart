import axios from "axios";
import { responseMessage } from "./ACMessagesAction";

import {
  BASE_URL,
  GET_CARS_LIST,
  CREATE_CAR,
  UPDATE_CAR,
  CHANGE_PAGE,
  CHANGE_ORDER,
  CHANGE_BRAND,
  CHANGE_CATEGORY,
  CHANGE_SEARCH,
  CHANGE_MIN_PRICE,
  CHANGE_MAX_PRICE
} from "@src/constants";

export const changePage = activePage => (dispatch, getState) => {
  dispatch({
    type: CHANGE_PAGE,
    payload: activePage
  });
};

export const changeBrand = brand => (dispatch, getState) => {
  dispatch({
    type: CHANGE_BRAND,
    payload: brand
  });
};

export const changeCategory = category => (dispatch, getState) => {
  dispatch({
    type: CHANGE_CATEGORY,
    payload: category
  });
};

export const changeOrder = order => (dispatch, getState) => {
  dispatch({
    type: CHANGE_ORDER,
    payload: order
  });
};

export const changeSearch = search => (dispatch, getState) => {
  dispatch({
    type: CHANGE_SEARCH,
    payload: search
  });
};

export const changeMinPrice = min => (dispatch, getState) => {
  dispatch({
    type: CHANGE_MIN_PRICE,
    payload: min
  });
};

export const changeMaxPrice = max => (dispatch, getState) => {
  dispatch({
    type: CHANGE_MAX_PRICE,
    payload: max
  });
};

export const getCarsList = (
  countPerPage,
  curPage,
  orderBy,
  brand,
  category,
  search,
  minPrice,
  maxPrice
) => (dispatch, getState) => {
  const offset = countPerPage * (curPage - 1);
  axios
    .get(
      `${BASE_URL}/cars?limit=${countPerPage}&offset=${offset}&ordering=${orderBy}&brand=${brand.join()}&category=${category.join()}&search=${search}&price__gte=${minPrice}&price__lte=${maxPrice}`
    )
    .then(res => {
      dispatch({
        type: GET_CARS_LIST,
        payload: res.data
      });
    })
    .catch(err => alert(err));
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
