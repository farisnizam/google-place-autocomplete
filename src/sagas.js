import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_USERS_FETCH,
  GET_USERS_SUCCESS,
  SEARCH_ACTION_TYPES,
} from "./store/search/search.action";

const usersFetch = () => {
  return fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
    response.json()
  );
};

// function* setSearchInput({ payload: address }) {
//   // const users = yield call(usersFetch);
//   yield put({ type: SEARCH_ACTION_TYPES.SET_SEARCH_HISTORY, address });
// }

function* workGetUsersFetch() {
  const users = yield call(usersFetch);
  yield put({ type: GET_USERS_SUCCESS, users });
}

// function* mySaga() {
//   yield takeEvery(GET_USERS_FETCH, setSearchInput);
// }

function* mySaga() {
  yield takeEvery(GET_USERS_FETCH, workGetUsersFetch);
}

export default mySaga;
