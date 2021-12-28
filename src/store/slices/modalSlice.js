/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  modalType: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalType = action.payload;
      state.isOpened = true;
    },
    closeModal: (state) => {
      state.modalType = null;
      state.isOpened = false;
    },
  },
});

const { actions, reducer } = modalSlice;

export { actions };
export default reducer;
