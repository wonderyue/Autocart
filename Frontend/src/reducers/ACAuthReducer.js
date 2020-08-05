import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  ACCESS_TOKEN,
  ACCESS_EXPIRE,
  REFRESH_TOKEN,
  REFRESH_EXPIRE,
  GET_USER,
  USER_ID,
  SET_TOKEN,
  NEED_LOGIN
} from "@src/constants";

const initState = {
  isAuthenticated: !!localStorage.getItem(ACCESS_TOKEN),
  token: localStorage.getItem(ACCESS_TOKEN),
  refreshToken: localStorage.getItem(REFRESH_TOKEN),
  expire: localStorage.getItem(ACCESS_EXPIRE) || 0,
  refreshExpire: localStorage.getItem(REFRESH_EXPIRE) || 0,
  userid: localStorage.getItem(USER_ID),
  errorMsg: null,
  username: null,
  img: null,
  isStaff: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem(ACCESS_TOKEN, action.payload.access);
      localStorage.setItem(REFRESH_TOKEN, action.payload.refresh);
      localStorage.setItem(ACCESS_EXPIRE, action.payload.exp);
      localStorage.setItem(REFRESH_EXPIRE, action.payload.refreshExp);
      return {
        ...state,
        token: action.payload.access,
        refreshToken: action.payload.refresh,
        expire: action.payload.exp,
        refreshExpire: action.payload.refreshExp
      };
    case LOGIN_SUCCESS:
    case SIGN_UP_SUCCESS:
      localStorage.setItem(ACCESS_TOKEN, action.payload.token.access);
      localStorage.setItem(REFRESH_TOKEN, action.payload.token.refresh);
      localStorage.setItem(USER_ID, action.payload.id);
      localStorage.setItem(ACCESS_EXPIRE, action.payload.token.exp);
      localStorage.setItem(REFRESH_EXPIRE, action.payload.token.refreshExp);
      return {
        ...state,
        isAuthenticated: true,
        errorMsg: null,
        token: action.payload.token.access,
        refreshToken: action.payload.token.refresh,
        expire: action.payload.token.exp,
        refreshExpire: action.payload.refreshExp,
        userid: action.payload.id,
        username: action.payload.username,
        img: action.payload.img,
        isStaff: action.payload.is_staff
      };
    case LOGIN_FAIL:
    case SIGN_UP_FAIL:
      return {
        ...state,
        errorMsg: action.payload
      };
    case NEED_LOGIN:
    case LOGOUT:
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(USER_ID);
      localStorage.removeItem(ACCESS_EXPIRE);
      localStorage.removeItem(REFRESH_EXPIRE);
      return {
        ...state,
        isAuthenticated: false,
        errorMsg: null,
        token: null,
        refreshToken: null,
        expire: 0,
        refreshExpire: 0,
        userid: null,
        username: null,
        img: null,
        isStaff: false
      };
    case GET_USER:
      return {
        ...state,
        userid: action.payload.id,
        username: action.payload.username,
        img: action.payload.img,
        isStaff: action.payload.is_staff
      };
    default:
      return state;
  }
}
