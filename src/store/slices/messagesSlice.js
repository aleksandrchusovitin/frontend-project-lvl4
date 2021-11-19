import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messagesFetched: (state) => state.messages,
    messagesAdded: (state, action) => [...state.messages, ...action.payload],
  },
});

const { actions, reducer } = messagesSlice;

export default reducer;
export const {
  messagesFetched,
  messagesAdded,
} = actions;
