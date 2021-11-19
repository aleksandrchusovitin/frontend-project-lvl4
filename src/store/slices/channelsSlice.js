import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    channelsAdded: (state, action) => [...state.channels, ...action.payload],
  },
});

const { actions, reducer } = channelsSlice;

export default reducer;
export const {
  channelsFetched,
  channelsAdded,
} = actions;
