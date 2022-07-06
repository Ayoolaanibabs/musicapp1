import { createSlice } from '@reduxjs/toolkit';
import { IPlaylistType } from '../interfaces/PlaylistType.interface';

const initialState: IPlaylistType = {
  data: [],
};

const mySlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylist: (state, action) => {
      state.data.push(action.payload);
    },
    deleteSongFromPlaylist: (state, action) => {
      state.data.splice(state.data.findIndex((item) => item.trackUri === action.payload), 1);
      return state;
    },
    clearPlaylist: (state) => {
      state.data = [];
      return state;
    },
  },
});

// var lists = list.filter(x => {
//   return x.Id != id;
// })

const {
  setPlaylist, clearPlaylist, deleteSongFromPlaylist,
} = mySlice.actions;

export {
  setPlaylist, clearPlaylist, deleteSongFromPlaylist,
};
export default mySlice.reducer;
