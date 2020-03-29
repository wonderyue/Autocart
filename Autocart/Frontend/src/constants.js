export const BASE_URL = "http://localhost:8000/";
export const ACCESS_TOKEN = "AC_ACCESS_TOKEN";
export const REFRESH_TOKEN = "AC_REFRESH_TOKEN";
export const ACCESS_EXPIRE = "AC_ACCESS_EXPIRE";
export const REFRESH_EXPIRE = "AC_REFRESH_EXPIRE";
export const USER_ID = "AC_USER_ID";
export const SET_TOKEN = "SET_TOKEN";
export const NEED_LOGIN = "NEED_LOGIN";
export const GET_CARS_LIST = "GET_CARS_LIST";
export const UPDATE_CAR = "UPDATE_CAR";
export const CREATE_CAR = "CREATE_CAR";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const CHANGE_COUNT_PER_PAGE = "CHANGE_COUNT_PER_PAGE";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const CHANGE_BRAND = "CHANGE_BRAND";
export const CHANGE_CATEGORY = "CHANGE_CATEGORY";
export const CHANGE_SEARCH = "CHANGE_SEARCH";
export const CHANGE_MIN_PRICE = "CHANGE_MIN_PRICE";
export const CHANGE_MAX_PRICE = "CHANGE_MAX_PRICE";
export const GET_ONE_PAGE = "GET_ONE_PAGE";
export const MESSAGE = "MESSAGE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAIL = "SIGN_UP_FAIL";
export const GET_USER = "GET_USER";
export const GET_CART = "GET_CART";

export const TYPE_2_PROP = {
  [CHANGE_PAGE]: "curPage",
  [CHANGE_COUNT_PER_PAGE]: "countPerPage",
  [CHANGE_ORDER]: "ordering",
  [CHANGE_BRAND]: "brand",
  [CHANGE_CATEGORY]: "category",
  [CHANGE_SEARCH]: "search",
  [CHANGE_MIN_PRICE]: "price__gte",
  [CHANGE_MAX_PRICE]: "price__lte"
};
