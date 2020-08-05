import {
  GET_ONE_PAGE,
  CHANGE_PAGE,
  CHANGE_COUNT_PER_PAGE,
  TYPE_2_PROP,
} from "@src/constants";
import { trimPrefix } from "@src/actions/actionHelper";

/**
 * initState format
 * {
    count: 0,
    list: [],
    curPage: 1,
    countPerPage: 10,
    filters: {
      ordering: "-price",
      brand: [],
      category: [],
      search: "",
      price__gte: "",
      price__lte: ""
    }
  })
 */
const defaultInitState = {
  count: 0,
  list: [],
  curPage: 1,
  countPerPage: 10,
  filters: {},
};

const PaginationReducer = (prefix, initState = defaultInitState) => (
  state = initState,
  action
) => {
  const type = trimPrefix(prefix, action.type);
  if (type == GET_ONE_PAGE) {
    return {
      ...state,
      count: action.payload.count,
      list: action.payload.results,
    };
  } else if (type == CHANGE_PAGE || type == CHANGE_COUNT_PER_PAGE) {
    return {
      ...state,
      [TYPE_2_PROP[type]]: action.payload,
    };
  } else if (TYPE_2_PROP[type]) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [TYPE_2_PROP[type]]: action.payload,
      },
    };
  } else return state;
};

export default PaginationReducer;
