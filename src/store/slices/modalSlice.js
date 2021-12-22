/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpened = action.payload;
    },
    closeModal: (state) => {
      state.isOpened = null;
    },
  },
});

const { actions, reducer } = modalSlice;

export default reducer;
export const {
  openModal,
  closeModal,
} = actions;
