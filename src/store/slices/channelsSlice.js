/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 1,
  channelWithAction: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getData: (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    },
    currentChannelIdUpdated: (state, action) => {
      state.currentChannelId = action.payload;
    },
    channelWithActionUpdated: (state, action) => {
      state.channelWithAction = action.payload;
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

export { actions };
export default reducer;
