import { createSlice } from '@reduxjs/toolkit';
import { ISearchResultType } from '../interfaces/SearchResultType.interface';

const initialState: ISearchResultType = {
  data: []  
};

const mySlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setSearchResult: (state, action) => {
      state.data.push(action.payload);
      return state;
    },
    clearSearchResult: (state) => {
      state.data = [];
      return state;
    }
  },
});

const {
  setSearchResult, clearSearchResult
} = mySlice.actions;

export {
  setSearchResult, clearSearchResult
};
export default mySlice.reducer;
