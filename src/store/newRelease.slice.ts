import { createSlice } from '@reduxjs/toolkit';
import { INewReleaseType } from '../interfaces/NewReleaseType.interface';

const initialState: INewReleaseType = {
  data: []  
};

const mySlice = createSlice({
  name: 'newRelease',
  initialState,
  reducers: {
    setNewRelease: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

const {
  setNewRelease,
} = mySlice.actions;

export {
  setNewRelease,
};
export default mySlice.reducer;
