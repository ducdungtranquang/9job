/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  accecptCompany,
  getCompanies,
  rejectCompany,
} from "services/company.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const fetchCompanyData = createAsyncThunk(
  "job/fetchAll",
  async (_, { dispatch, getState }) => {
    const state = getState();
    const { page, per_page } = state.companies;

    dispatch(showOverlay());
    try {
      const response = await getCompanies({ page, per_page });
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch jobs");
    }
  }
);

export const accecptCompanyData = createAsyncThunk(
  "job/acceptJob",
  async (params, { dispatch }) => {
    const { id, is_ads } = params;
    dispatch(showOverlay());
    try {
      await accecptCompany({ id, is_ads });
      await dispatch(fetchCompanyData());
      dispatch(hideOverlay());
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to accept job");
    }
  }
);

export const rejectCompanyData = createAsyncThunk(
  "job/rejectJob",
  async (params, { dispatch }) => {
    const { id, is_ads } = params;
    dispatch(showOverlay());
    try {
      await rejectCompany({ id, is_ads });
      await dispatch(fetchCompanyData());
      dispatch(hideOverlay());
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to reject job");
    }
  }
);

export const companyAdapter = createEntityAdapter();
const initialState = companyAdapter.getInitialState({
  listCompanies: [],
  page: 1,
  per_page: 10,
  total_items: 0,
  total_pages: 0,
  error: null,
});

export const companySlice = createSlice({
  name: "companies",
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
    builder.addCase(fetchCompanyData.fulfilled, (state, action) => {
      state.listCompanies = action.payload.data;
      state.total_items = action.payload.total_items;
      state.total_pages = action.payload.total_pages;
    });
    builder.addCase(accecptCompanyData.fulfilled, (state, action) => {
      // state.listCompanies = action.payload.data;
    });
    builder.addCase(rejectCompanyData.fulfilled, (state, action) => {
      // state.listCompanies = action.payload.data;
    });
  },
});

export const { setPage, setPageSize } = companySlice.actions;
export default companySlice.reducer;
