import { GET_CARS_LIST, UPDATE_CAR_INFO, CHANGE_PAGE } from "@src/constants";

const initState = {
  count: 0,
  list: [],
  curPage: 1,
  countPerPage: 10
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_CARS_LIST:
      return {
        ...state,
        count: action.payload.count,
        list: action.payload.results
      };
    case CHANGE_PAGE:
      return {
        ...state,
        curPage: action.payload
      };
    default:
      return state;
  }
}
