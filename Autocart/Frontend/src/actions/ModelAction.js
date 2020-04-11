import { clientRequestWithToken } from "../utils/axioWrapper";
import {
  CREATE_MODEL,
  UPDATE_MODEL,
  RETRIEVE_MODEL,
  LIST_MODEL,
  DELETE_MODEL,
} from "@src/constants";
import { addPrefix } from "@src/actions/actionHelper";
import { asynActionWithToken } from "./actionHelper";

const ModelAction = (prefix, url) => ({
  list: () =>
    asynActionWithToken((dispatch, getState) => {
      clientRequestWithToken({
        method: "get",
        url: url,
      }).then((res) => {
        dispatch({
          type: addPrefix(prefix, LIST_MODEL),
          payload: res,
        });
      });
    }),

  create: (obj) =>
    asynActionWithToken((dispatch, getState) => {
      clientRequestWithToken({
        method: "post",
        url: url,
        data: JSON.stringify(obj),
      }).then((res) => {
        dispatch({
          type: addPrefix(prefix, CREATE_MODEL),
          payload: res,
        });
      });
    }),

  retrieve: (id) =>
    asynActionWithToken((dispatch, getState) => {
      clientRequestWithToken({
        method: "get",
        url: url + id + "/",
      }).then((res) => {
        dispatch({
          type: addPrefix(prefix, RETRIEVE_MODEL),
          payload: res,
        });
      });
    }),

  update: (id, obj) =>
    asynActionWithToken((dispatch, getState) => {
      clientRequestWithToken({
        method: "patch",
        url: url + id + "/",
        data: JSON.stringify(obj),
      }).then((res) => {
        dispatch({
          type: addPrefix(prefix, UPDATE_MODEL),
          payload: res,
        });
      });
    }),

  delete: (id) =>
    asynActionWithToken((dispatch, getState) => {
      clientRequestWithToken({
        method: "delete",
        url: url + id + "/",
      }).then((res) => {
        dispatch({
          type: addPrefix(prefix, DELETE_MODEL),
          payload: res,
        });
      });
    }),
});

export default ModelAction;
