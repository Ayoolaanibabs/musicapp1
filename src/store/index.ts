import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import newReleaseReducer from "./newRelease.slice";
import playlistReducer from "./playlist.slice";
import searchResultReducer from "./searchResult.slice";
import userReducer from "./user.slice";

const rootReducer = combineReducers({
  user: userReducer,
  newRelease: newReleaseReducer,
  searchResult: searchResultReducer,
  playlist: playlistReducer,
});

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  });

export const store = createStore();

export default store;
