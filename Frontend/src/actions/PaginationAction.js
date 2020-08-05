import { clientRequest, clientRequestWithToken } from "../utils/axioWrapper";
import { GET_ONE_PAGE } from "@src/constants";
import { addPrefix } from "@src/actions/actionHelper";
import { asynActionWithToken } from "./actionHelper";

const PaginationAction = (prefix, url) => ({
  changeParam: (type, value) => {
    return {
      type: addPrefix(prefix, type),
      payload: value,
    };
  },

  getOnePage: (withToken, countPerPage, curPage, filters = {}) => {
    let fun = (dispatch, getState) => {
      const offset = countPerPage * (curPage - 1);
      const request = withToken ? clientRequestWithToken : clientRequest;
      let param = "";
      Object.keys(filters).map((key, index) => {
        if (filters[key] != undefined) param += `&${key}=${filters[key]}`;
      });
      request({
        method: "get",
        url: url + "?limit=" + countPerPage + "&offset=" + offset + param,
      }).then((res) => {
        dispatch({
          type: addPrefix(prefix, GET_ONE_PAGE),
          payload: res,
        });
      });
    };
    return withToken ? asynActionWithToken(fun) : fun;
  },
});

export default PaginationAction;
