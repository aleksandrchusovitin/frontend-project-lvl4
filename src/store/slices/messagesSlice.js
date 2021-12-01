/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const initialState = {
  messages: [],
  messagesLoadingStatus: 'idle',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messagesFetching: (state) => {
      state.messagesLoadingStatus = 'loading';
    },
    messagesFetched: (state, action) => {
      state.messagesLoadingStatus = 'idle';
      state.messages = action.payload;
    },
    messagesFetchingError: (state) => {
      state.messagesLoadingStatus = 'error';
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const { id } = action.payload;
        state.messages = state.messages.filter((m) => m.channelId !== id);
      });
  },
});

const { actions, reducer } = messagesSlice;

export default reducer;
export const {
  messagesFetching,
  messagesFetched,
  messagesFetchingError,
  addMessage,
} = actions;
