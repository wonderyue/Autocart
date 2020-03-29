import { GET_CART, UPDATE_CART, DELETE_CART } from "@src/constants";
import update from "immutability-helper";

const initState = {
  list: []
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        list: action.payload
      };
    case UPDATE_CART:
      const updatedItem = action.payload;
      const updateIdx = state.list.findIndex(item => item.id == updatedItem.id);
      return update(state, {
        list: { [updateIdx]: { $set: updatedItem } }
      });
    case DELETE_CART:
      const deletedItem = action.payload;
      const deleteIdx = state.list.findIndex(item => item.id == deletedItem.id);
      return update(state, {
        list: { $splice: [[deleteIdx, 1]] }
      });
    default:
      return state;
  }
}
