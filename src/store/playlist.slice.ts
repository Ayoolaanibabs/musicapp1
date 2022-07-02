import { createSlice } from '@reduxjs/toolkit';
import { IPlaylist } from '../interfaces/Playlist.interface';
const initialState: IPlaylist = {
  data: {
    artist: '',
    songTitle: '',
  },
};

// const initialState: EnergyUsageType = {
// 	open: false,
// 	type: ENERGY_USAGE_CONSTANTS.MORE,
// 	data: {
// 		email: null,
// 		firstName: null,
// 		lastName: null,
// 		phone: null,
// 		lga: null,
// 		state: PRE_ORDER_CONSTANTS.STATE,
// 		usage: "",
// 		cardNumber: 0,
// 		count: 1,
// 		totalAmount: 0,
// 		subTotal: 0,
// 		delivery: 0,
// 		address: null,
// 		price: 0,
// 		gateway: "paystack",
// 		firstPayment: 0,
// 		lastSubscription:0,
// 		lastSubscriptionMonth:null,
// 		totalSubscription: 0,
// 		totalOutstanding: 0,
// 		subscriptionModalEndsIn: null,
// 	},
// };

const mySlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setArtist: (state, action) => {
      state.data.artist = action.payload;
      return state;
    },
    setPlaylistData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

const {
  setArtist,
  setPlaylistData,
} = mySlice.actions;

export {
  setArtist,
  setPlaylistData,
};
export default mySlice.reducer;
