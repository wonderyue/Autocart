import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  GET_USER,
  USER_ID
} from "@src/constants";

const initState = {
  isAuthenticated: !!localStorage.getItem(ACCESS_TOKEN),
  token: localStorage.getItem(ACCESS_TOKEN),
  userid: localStorage.getItem(USER_ID),
  errorMsg: null,
  username: null,
  img: null,
  is_staff: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGN_UP_SUCCESS:
      localStorage.setItem(ACCESS_TOKEN, action.payload.token.access);
      localStorage.setItem(REFRESH_TOKEN, action.payload.token.refresh);
      localStorage.setItem(USER_ID, action.payload.id);
      return {
        ...state,
        isAuthenticated: true,
        errorMsg: null,
        token: action.payload.access,
        userid: action.payload.id,
        username: action.payload.username,
        img: action.payload.img,
        is_staff: action.payload.is_staff
      };
    case LOGIN_FAIL:
    case SIGN_UP_FAIL:
      return {
        ...state,
        errorMsg: action.payload
      };
    case LOGOUT:
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(USER_ID);
      return {
        ...state,
        isAuthenticated: false,
        errorMsg: null,
        token: null,
        userid: null,
        username: null,
        img: null,
        is_staff: false
      };
    case GET_USER:
      return {
        ...state,
        userid: action.payload.id,
        username: action.payload.username,
        img: action.payload.img,
        is_staff: action.payload.is_staff
      };
    default:
      return state;
  }
}
