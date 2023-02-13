import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import searchReducer from "./search/search.reducer";
import searchSaga from "./search/search.saga";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ searchReducer });

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);
export const persistor = persistStore(store);

sagaMiddleware.run(searchSaga);
