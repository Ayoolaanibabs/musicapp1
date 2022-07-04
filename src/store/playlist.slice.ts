import { createSlice } from '@reduxjs/toolkit';
import { INewReleaseType } from '../interfaces/NewReleaseType.interface';

const initialState: INewReleaseType = {
  data: []  
};

const mySlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylist: (state, action) => {
      state.data.push(action.payload);
    },
    clearPlaylist: (state) => {
      state.data = [];
      return state;
    }
  },
});

const {
  setPlaylist, clearPlaylist
} = mySlice.actions;

export {
  setPlaylist, clearPlaylist
};
export default mySlice.reducer;