/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  channelsLoadingStatus: 'idle',
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    channelsFetching: (state) => {
      state.channelsLoadingStatus = 'loading';
    },
    channelsFetched: (state, action) => {
      state.channelsLoadingStatus = 'idle';
      state.channels = action.payload;
    },
    channelsFetchingError: (state) => {
      state.channelsLoadingStatus = 'error';
    },
    currentChannelIdFetched: (state, action) => {
      state.currentChannelId = action.payload;
    },
    currentChannelIdUpdated: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

const { actions, reducer } = channelsSlice;

export default reducer;
export const {
  channelsFetched,
  channelsFetching,
  channelsFetchingError,
  currentChannelIdFetched,
  currentChannelIdUpdated,
} = actions;
