/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalSetting: (state, action) => {
      state.modal = action.payload;
    },
  },
});

const { actions, reducer } = modalSlice;

export default reducer;
export const {
  modalSetting,
} = actions;
