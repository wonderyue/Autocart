import { CAR_URL, CART_URL, ORDER_URL } from "@src/constants";
import PaginationAction from "./PaginationAction";
import ModelAction from "./ModelAction";

export const CarListAction = PaginationAction("CarList", CAR_URL);
export const CartModelAction = ModelAction("Cart", CART_URL);
export const OrderModelAction = ModelAction("Order", ORDER_URL);
export const OrderListAction = PaginationAction("OrderList", ORDER_URL);
