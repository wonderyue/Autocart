import { clientRequest, clientRequestWithToken } from "../utils/axioWrapper";
import {
  GET_CAR,
  UPDATE_CAR,
  CREATE_CAR,
  GET_CAR_IMAGES,
  CREATE_CAR_IMAGE,
  UPDATE_CAR_IMAGE,
  DELETE_CAR_IMAGE,
} from "@src/constants";
import { asynActionWithToken } from "./actionHelper";

export const getCar = (id, isStaff) => (dispatch, getState) => {
  clientRequest({
    method: "get",
    url: "/cars/" + id + "/" + (isStaff ? "?enable=all" : ""),
  }).then((res) => {
    dispatch({
      type: GET_CAR,
      payload: res,
    });
  });
};

export const updateCar = (id, obj) =>
  asynActionWithToken((dispatch, getState) => {
    let formData = new FormData();
    for (let key in obj) {
      if (obj[key] != null) {
        formData.append(key, obj[key]);
      }
    }
    clientRequestWithToken({
      method: "patch",
      url: `/cars/${id}/?enable=all`,
      data: formData,
    }).then((res) => {
      dispatch({
        type: UPDATE_CAR,
        payload: res,
      });
    });
  });

export const addCar = (obj) =>
  asynActionWithToken((dispatch, getState) => {
    clientRequestWithToken({
      method: "post",
      url: "/cars/",
      data: JSON.stringify(obj),
    }).then((res) => {
      dispatch({
        type: CREATE_CAR,
        payload: res,
      });
    });
  });

export const getCarImages = (id) => (dispatch, getState) => {
  clientRequest({
    method: "get",
    url: "/carimages/?car=" + id,
  }).then((res) => {
    dispatch({
      type: GET_CAR_IMAGES,
      payload: res,
    });
  });
};

export const updateCarImage = (id, obj) =>
  asynActionWithToken((dispatch, getState) => {
    let formData = new FormData();
    for (let key in obj) {
      if (obj[key] != null) {
        formData.append(key, obj[key]);
      }
    }
    clientRequestWithToken({
      method: "patch",
      url: `/carimages/${id}/`,
      data: formData,
    }).then((res) => {
      dispatch({
        type: UPDATE_CAR_IMAGE,
        payload: res,
      });
    });
  });

export const addCarImage = (obj) =>
  asynActionWithToken((dispatch, getState) => {
    let formData = new FormData();
    for (let key in obj) {
      if (key != "id") {
        formData.append(key, obj[key]);
      }
    }
    clientRequestWithToken({
      method: "post",
      url: "/carimages/",
      data: formData,
    }).then((res) => {
      dispatch({
        type: CREATE_CAR_IMAGE,
        payload: res,
      });
    });
  });

export const removeCarImage = (id) =>
  asynActionWithToken((dispatch, getState) => {
    clientRequestWithToken({
      method: "delete",
      url: `/carimages/${id}/`,
    }).then((res) => {
      dispatch({
        type: DELETE_CAR_IMAGE,
        payload: res,
      });
    });
  });
