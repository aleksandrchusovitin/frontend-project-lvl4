/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, action) => {
        const { id } = action.payload;
        state.messages = state.messages.filter((m) => m.channelId !== id);
      })
      .addCase(channelsActions.getData, (state, action) => {
        state.messages = action.payload.messages;
      });
  },
});

const { actions, reducer } = messagesSlice;

export { actions };
export default reducer;
