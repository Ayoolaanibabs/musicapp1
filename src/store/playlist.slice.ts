import { createSlice } from "@reduxjs/toolkit";
import { IPlaylistType } from "../interfaces/PlaylistType.interface";

const initialState: IPlaylistType = {
  data: [],
};

const mySlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylist: (state, action) => {
      state.data.push(action.payload);
    },
    deleteSongFromPlaylist: (state, action) => {
      state.data.splice(
        state.data.findIndex((item) => item.trackUri === action.payload),
        1
      );
      return state;
    },
  },
});

const { setPlaylist, deleteSongFromPlaylist } = mySlice.actions;

export { setPlaylist, deleteSongFromPlaylist };
export default mySlice.reducer;
