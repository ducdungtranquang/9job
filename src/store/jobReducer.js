/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  accecptJob,
  getAlJob,
  rejectJob,
  updateJobDataById,
} from "services/job.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const fetchJobData = createAsyncThunk(
  "job/fetchAll",
  async (_, { dispatch, getState }) => {
    const state = getState();
    const { page, per_page } = state.jobs;

    dispatch(showOverlay());
    try {
      const response = await getAlJob({ page, per_page, created_at: "newest" });
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch jobs");
    }
  }
);

export const accecptJobData = createAsyncThunk(
  "job/acceptJob",
  async ({ id, status }, { dispatch }) => {
    dispatch(showOverlay());
    try {
      await accecptJob(id, { status });
      await dispatch(fetchJobData());
      dispatch(hideOverlay());
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to accept job");
    }
  }
);

export const rejectJobData = createAsyncThunk(
  "job/rejectJob",
  async ({ id, status }, { dispatch }) => {
    dispatch(showOverlay());
    try {
      await rejectJob(id, { status });
      await dispatch(fetchJobData());
      dispatch(hideOverlay());
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to reject job");
    }
  }
);

export const updateJobById = createAsyncThunk(
  "job/update",
  async ({ id, data }, { dispatch }) => {
    dispatch(showOverlay());
    try {
      const response = await updateJobDataById(id, data);
      dispatch(hideOverlay());

      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to reject job");
    }
  }
);

export const jobAdapter = createEntityAdapter();
const initialState = jobAdapter.getInitialState({
  listJobs: [],
  page: 1,
  per_page: 10,
  value: "",
  total_items: 0,
  total_pages: 0,
  error: null,
});

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    setParams(state, action) {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobData.fulfilled, (state, action) => {
        state.listJobs = action.payload.data;
        state.total_items = action.payload.total_items;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(accecptJobData.fulfilled, (state, action) => {
        // state.listJobs = action.payload.data;
      })
      .addCase(rejectJobData.fulfilled, (state, action) => {
        // state.listJobs = action.payload.data;
      })
      .addCase(updateJobById.fulfilled, (state, action) => {
        const data = action.payload;
        const index = state.listJobs.findIndex((item) => item.id === data.id);
        state.listJobs[index] = data;
      });
  },
});

export const { setPage, setPageSize, setParams } = jobSlice.actions;
export default jobSlice.reducer;
