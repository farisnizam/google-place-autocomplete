import { GET_USERS_SUCCESS, SEARCH_ACTION_TYPES } from "./actions";
const myFirstReducer = (state = { users: [], address: [{}] }, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return { ...state, users: action.users };
    case SEARCH_ACTION_TYPES.SET_CURRENT_SEARCH:
      return {
        ...state,
        address: [...state.address, { description: action.payload }],
      };
    default:
      return state;
  }
};

export default myFirstReducer;
