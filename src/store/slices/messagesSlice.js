/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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
});

const { actions, reducer } = messagesSlice;

export default reducer;
export const {
  messagesFetching,
  messagesFetched,
  messagesFetchingError,
  addMessage,
} = actions;
