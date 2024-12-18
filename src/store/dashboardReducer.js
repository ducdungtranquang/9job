/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getDashboard } from "services/dashboard.service";

export const getdashboardData = createAsyncThunk("dashboard/getAll", async (param) => {
  try {
    const response = await getDashboard(param);
    return response.data;
  } catch (error) {
    return false;
  }
});

export const dashboardAdapter = createEntityAdapter();
const initialState = dashboardAdapter.getInitialState({
    total_jobs: 0,
    total_users: 0,
    total_courses: 0,
    total_user_cvs: 0
});

export const dashboardSlice = createSlice({
  name: "dashboards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getdashboardData.fulfilled, (state, action) => {
      const { total_jobs, total_users, total_courses, total_user_cvs } = action.payload?.data;
      state.total_jobs = total_jobs;
      state.total_users = total_users;
      state.total_courses = total_courses;
      state.total_user_cvs = total_user_cvs;
    });
  },
});

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
