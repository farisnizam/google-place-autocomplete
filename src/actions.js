import { createAction } from "./utils/reducer/reducer.utils";

export const GET_USERS_FETCH = "GET_USERS_FETCH";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";

export const SEARCH_ACTION_TYPES = {
  SET_CURRENT_SEARCH: "search/SET_CURRENT_SEARCH",
};

export const getUsersFetch = () => createAction(GET_USERS_FETCH);
// export const getUsersFetch = () => ({
//   type: GET_USERS_FETCH,
// });

export const getSearch = (address) =>
  createAction(SEARCH_ACTION_TYPES.SET_CURRENT_SEARCH, address);
