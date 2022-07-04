import { createSlice } from '@reduxjs/toolkit';
import { IUserType } from '../interfaces/UserType.interface';

const initialState: IUserType = {
  user: {
    id: '',
    name: '',
    imageUrl: '',
  },
};

const mySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

const {
  setUserData,
} = mySlice.actions;

export {
  setUserData,
};
export default mySlice.reducer;
