import { combineReducers } from '@reduxjs/toolkit';
import channels from './channelsSlice.js';
import messages from './messagesSlice.js';
import modal from './modalSlice.js';

export default combineReducers({
  channels,
  messages,
  modal,
});
