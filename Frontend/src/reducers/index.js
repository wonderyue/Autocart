import Auth from "./ACAuthReducer";
import Pagination from "./PaginationReducer";
import ModelReducer from "./ModelReducer";
import Car from "./ACCarReducer";
import { combineReducers } from "redux";

export default combineReducers({
  Auth,
  CarList: Pagination("CarList", {
    count: 0,
    list: [],
    curPage: 1,
    countPerPage: 10,
    filters: {
      ordering: "-year",
      brand: [],
      category: [],
      search: "",
      price__gte: "",
      price__lte: "",
      enable: true,
    },
  }),
  Car,
  Cart: ModelReducer("Cart"),
  Order: ModelReducer("Order"),
  OrderList: Pagination("OrderList", {
    count: 0,
    list: [],
    curPage: 1,
    countPerPage: 10,
    filters: {
      ordering: "-createTime",
    },
  }),
  Comment: ModelReducer("Comment"),
  CommentList: Pagination("CommentList", {
    count: 0,
    list: [],
    curPage: 1,
    countPerPage: 10,
    filters: {},
  }),
});
