/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { accecptCVJob, getAllCVJob, rejectCVJob } from "services/cvJob.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const fetchCVJobData = createAsyncThunk(
  "cvJobs/fetchAll",
  async (_, { dispatch, getState }) => {
    const state = getState();
    const { page, per_page, jobCvFilter } = state.cvJobs;

    const { search, status, created_at, is_watched } = jobCvFilter;

    dispatch(showOverlay());
    try {
      const response = await getAllCVJob({
        page,
        per_page,
        search,
        status,
        created_at,
        is_watched,
      });
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch cvJobs");
    }
  }
);

export const accecptCVJobData = createAsyncThunk(
  "cvJobs/acceptcvJob",
  async ({ id, status }, { dispatch }) => {
    dispatch(showOverlay());
    try {
      await accecptCVJob(id, { status });
      await dispatch(fetchCVJobData());
      dispatch(hideOverlay());
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to accept cvJobs");
    }
  }
);

export const rejectCVJobData = createAsyncThunk(
  "cvJobs/rejectcvJob",
  async ({ id, status }, { dispatch }) => {
    dispatch(showOverlay());
    try {
      await rejectCVJob(id, { status });
      await dispatch(fetchCVJobData());
      dispatch(hideOverlay());
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to reject cvJobs");
    }
  }
);

export const cvJobAdapter = createEntityAdapter();
const initialState = cvJobAdapter.getInitialState({
  listCVJobs: [],
  page: 1,
  per_page: 10,
  total_items: 0,
  total_pages: 0,
  error: null,
  jobCvFilter: {
    search: "",
    status: "",
    created_at: null,
    is_watched: null,
  },
});

export const cvJobSlice = createSlice({
  name: "cvJobs",
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
    builder.addCase(fetchCVJobData.fulfilled, (state, action) => {
      state.listCVJobs = action.payload.data;
      state.total_items = action.payload.total_items;
      state.total_pages = action.payload.total_pages;
    });
    builder.addCase(accecptCVJobData.fulfilled, (state, action) => {
      state.listCVJobs = action.payload.data;
    });
    builder.addCase(rejectCVJobData.fulfilled, (state, action) => {
      // state.listCVJobs = action.payload.data;
    });
  },
});

export const { setPage, setPageSize } = cvJobSlice.actions;
export default cvJobSlice.reducer;
