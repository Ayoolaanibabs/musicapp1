import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import newReleaseReducer from './newRelease.slice';
import playlistReducer from './playlist.slice';
import searchResultReducer from './searchResult.slice';
import userReducer from './user.slice';

const rootReducer = combineReducers({
  user: userReducer,
  newRelease: newReleaseReducer,
  searchResult: searchResultReducer,
  playlist: playlistReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

export default store;
