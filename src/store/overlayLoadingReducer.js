// overlaySlice.js
import { createSlice } from "@reduxjs/toolkit";

const overlaySlice = createSlice({
  name: "overlay",
  initialState: {
    isLoading: false,
  },
  reducers: {
    showOverlay(state) {
      state.isLoading = true;
    },
    hideOverlay(state) {
      state.isLoading = false;
    },
  },
});

export const { showOverlay, hideOverlay } = overlaySlice.actions;
export default overlaySlice.reducer;