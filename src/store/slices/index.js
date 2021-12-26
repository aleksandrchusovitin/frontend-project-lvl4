import { combineReducers } from '@reduxjs/toolkit';
import channelsReducers, { actions as channelsActions } from './channelsSlice.js';
import messagesReducers, { actions as messagesActions } from './messagesSlice.js';
import modalReducers, { actions as modalActions } from './modalSlice.js';

export const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

export default combineReducers({
  channelsReducers,
  messagesReducers,
  modalReducers,
});
