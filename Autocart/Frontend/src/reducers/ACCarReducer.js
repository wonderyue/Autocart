import {
  GET_CAR,
  UPDATE_CAR,
  CREATE_CAR,
  GET_CAR_IMAGES,
  CREATE_CAR_IMAGE,
  UPDATE_CAR_IMAGE,
  DELETE_CAR_IMAGE,
} from "@src/constants";
import update from "immutability-helper";

const initState = { detailImages: [] };

export default function (state = initState, action) {
  switch (action.type) {
    case GET_CAR:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_CAR:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_CAR:
      return {
        ...state,
        ...action.payload,
      };
    case GET_CAR_IMAGES:
      return {
        ...state,
        detailImages: action.payload,
      };
    case UPDATE_CAR_IMAGE:
      const updatedItem = action.payload;
      const updateIdx = state.detailImages.findIndex(
        (item) => item.id == updatedItem.id
      );
      return update(state, {
        detailImages: { [updateIdx]: { $set: updatedItem } },
      });
    case CREATE_CAR_IMAGE:
      return update(state, {
        detailImages: { $push: [action.payload] },
      });
    case DELETE_CAR_IMAGE:
      const deletedItem = action.payload;
      const deleteIdx = state.detailImages.findIndex(
        (item) => item.id == deletedItem.id
      );
      return update(state, {
        detailImages: { $splice: [[deleteIdx, 1]] },
      });
    default:
      return state;
  }
}
