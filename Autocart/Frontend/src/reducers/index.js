import CarList from "./ACCarListViewReducer";
import Auth from "./ACAuthReducer";
import { combineReducers } from "redux";

export default combineReducers({
  CarList,
  Auth
});
