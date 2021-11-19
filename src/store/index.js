import { configureStore } from '@reduxjs/toolkit';
import channels from './slices/channelsSlice.js';
import messages from './slices/messagesSlice.js';

const store = configureStore({
  reducer: { channels, messages },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
