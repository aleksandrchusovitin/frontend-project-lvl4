/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  channelsLoadingStatus: 'idle',
  currentChannelId: 1,
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
    addChannel: (state, action) => {
      state.channels = [...state.channels, action.payload];
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((c) => c.id !== action.payload.id);
      state.currentChannelId = initialState.currentChannelId;
    },
    renameChannel: (state, action) => {
      const channelIndex = state.channels.findIndex((c) => c.id === action.payload.id);
      const channel = state.channels[channelIndex];
      const newChannel = { ...channel, name: action.payload.name };
      state.channels[channelIndex] = newChannel;
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
  addChannel,
  removeChannel,
  renameChannel,
} = actions;
