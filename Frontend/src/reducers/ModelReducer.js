import {
  CREATE_MODEL,
  UPDATE_MODEL,
  RETRIEVE_MODEL,
  LIST_MODEL,
  DELETE_MODEL,
} from "@src/constants";
import { trimPrefix } from "@src/actions/actionHelper";
import update from "immutability-helper";

/**
 * initState format
 * {
    list: [],
    ...oneItem
  })
 */

const ModelReducer = (prefix, initState = { list: [] }) => (
  state = initState,
  action
) => {
  const type = trimPrefix(prefix, action.type);
  switch (type) {
    case LIST_MODEL:
      return {
        ...state,
        list: action.payload,
      };
    case CREATE_MODEL:
      const newItem = action.payload;
      return update(state, { $merge: newItem, list: { $push: [newItem] } });
    case RETRIEVE_MODEL:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_MODEL:
      const updatedItem = action.payload;
      const updateIdx = state.list.findIndex(
        (item) => item.id == updatedItem.id
      );
      return update(state, {
        $merge: updatedItem,
        list: { [updateIdx]: { $set: updatedItem } },
      });
    case DELETE_MODEL:
      const deletedItem = action.payload;
      const deleteIdx = state.list.findIndex(
        (item) => item.id == deletedItem.id
      );
      return update(state, {
        list: { $splice: [[deleteIdx, 1]] },
      });
    default:
      return state;
  }
};

export default ModelReducer;
