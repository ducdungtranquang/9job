import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { deleteUserByIdFromAdmin, getAllUser } from "services/user.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const fetchuserV2Data = createAsyncThunk(
  "userV2/fetchAll",
  async ({params}, { dispatch, getState }) => {
    const state = getState();
    const { page, per_page } = state.userV2;

    dispatch(showOverlay());
    try {
      const response = await getAllUser({ page, per_page: per_page, ...params });
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch userV2s");
    }
  }
);
// delete HandBook by id
export const deleteUserById = createAsyncThunk(
  "users/deleteById",
  async ({ id, category }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteUserByIdFromAdmin(id);
      if (response.status === 200) {
        dispatch(hideOverlay());
        return { id: id }
      }
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);

export const userV2Adapter = createEntityAdapter();
const initialState = userV2Adapter.getInitialState({
  listusers: [],
  page: 1,
  per_page: 10,
  total_items: 0,
  total_pages: 0,
  error: null,
});

export const userV2Slice = createSlice({
  name: "userV2",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchuserV2Data.fulfilled, (state, action) => {
      state.listusers = action.payload.data;
      state.total_items = action.payload.total_items;
      state.total_pages = action.payload.total_pages;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listusers = state.listusers.filter((item) => item.id !== id);
        state.total_items = state.listusers.length;

      });;
  },
});

export const { setPage, setPageSize } = userV2Slice.actions;
export default userV2Slice.reducer;
