import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  layout: "AppLayout",
  meta: null,
  isSidebarOpen: false,
  isToastMessageShow: false,
  toast: {
    message: "",
    severity: "success",
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
    setMeta: (state, action) => {
      state.meta = action.payload;
    },
    setSidebarOpen: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setIsToastMessageShow: (state) => {
      state.isToastMessageShow = !state.isToastMessageShow;
    },
    setMessage: (state, action) => {
      const { message, severity } = action.payload;
      state.toast.message = message;
      state.toast.severity = severity;
    },
  },
});

export const {
  setMode,
  setLayout,
  setSidebarOpen,
  setIsToastMessageShow,
  setMessage,
  setMeta,
} = globalSlice.actions;

export default globalSlice.reducer;
