import {
  GET_CARS_LIST,
  UPDATE_CAR_INFO,
  CHANGE_PAGE,
  CHANGE_ORDER,
  CHANGE_BRAND,
  CHANGE_CATEGORY,
  CHANGE_SEARCH,
  CHANGE_MIN_PRICE,
  CHANGE_MAX_PRICE
} from "@src/constants";

const initState = {
  count: 0,
  list: [],
  curPage: 1,
  countPerPage: 10,
  orderBy: "-year",
  brand: [],
  category: [],
  search: "",
  minPrice: "",
  maxPrice: ""
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
    case CHANGE_ORDER:
      return {
        ...state,
        orderBy: action.payload
      };
    case CHANGE_BRAND:
      return {
        ...state,
        brand: action.payload
      };
    case CHANGE_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case CHANGE_SEARCH:
      return {
        ...state,
        search: action.payload
      };
    case CHANGE_MIN_PRICE:
      return {
        ...state,
        minPrice: action.payload
      };
    case CHANGE_MAX_PRICE:
      return {
        ...state,
        maxPrice: action.payload
      };
    default:
      return state;
  }
}
