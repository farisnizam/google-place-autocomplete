import { createAction } from "../../utils/reducer/reducer.utils";

export const GET_USERS_FETCH = "GET_USERS_FETCH";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";

export const SEARCH_ACTION_TYPES = {
  SET_SEARCH_HISTORY: "SET_SEARCH_HISTORY",
  RESET_SEARCH_HISTORY: "RESET_SEARCH_HISTORY",
};

export const getUsersFetch = () => createAction(GET_USERS_FETCH);

export const getSearch = (address) =>
  createAction(SEARCH_ACTION_TYPES.SET_SEARCH_HISTORY, address);

export const resetSearch = () =>
  createAction(SEARCH_ACTION_TYPES.RESET_SEARCH_HISTORY);
