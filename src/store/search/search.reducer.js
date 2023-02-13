import {
  // GET_USERS_SUCCESS,
  SEARCH_ACTION_TYPES,
} from "./search.action";

const INITIAL_STATE = {
  users: [],
  address: [],
};
const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case GET_USERS_SUCCESS:
    //   return { ...state, users: action.users };
    case SEARCH_ACTION_TYPES.SET_SEARCH_HISTORY:
      return {
        ...state,
        address: [...state.address, { description: action.payload }],
      };
    case SEARCH_ACTION_TYPES.RESET_SEARCH_HISTORY:
      return {
        ...state,
        address: [],
      };
    default:
      return state;
  }
};

export default searchReducer;
