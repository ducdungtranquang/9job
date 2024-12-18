/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { deleteBannerWeb, getAllBannersWeb, getBannerWebById } from "services/bannersWeb.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getBannersWebData = createAsyncThunk( "bannersWeb/getAll",
  async ({ params }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await getAllBannersWeb(params);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch BannersWeb", error);
    }
  }
);

// get BannersWeb by id
export const getBannersWebByIdData = createAsyncThunk(
  "bannersWeb/getById",
  async (id, { dispatch }) => {
    dispatch(showOverlay());
    try {
      const response = await getBannerWebById(id);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);



// delete BannersWeb by id
export const deleteBannersWebById = createAsyncThunk(
  "bannersWeb/deleteById",
  async ({ id, category }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteBannerWeb(id);
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

export const bannersWebAdapter = createEntityAdapter();
const initialState = bannersWebAdapter.getInitialState({
  listBannersWeb: [],
  bannersWebDetail: null,
  page: 1,
  per_page: 30,
  total_items: 100,
  total_pages: 0,
});

export const bannersWebSlice = createSlice({
  name: "bannersWeb",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    resetBannersWebForm: (state, action) => {
      state.bannersWebDetail =null
    },
    setNewBannersWeb: (state, action) => {
      state.listBannersWeb.unshift(action.payload)
    },
    updateBannersWebById: (state, action) => {
      const { data, id } = action.payload;
      const index = state.listBannersWeb.findIndex(item => item.id === id);
      state.listBannersWeb[index] = data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBannersWebData.fulfilled, (state, action) => {
        const { data, total_items } = action.payload;
        state.listBannersWeb = data || [];
        state.total_items = total_items || 0;
      })
      .addCase(getBannersWebByIdData.fulfilled, (state, action) => {
        console.log('action: ', action.payload);
        state.bannersWebDetail = action.payload.data;
      })
      .addCase(deleteBannersWebById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listBannersWeb = state.listBannersWeb.filter((item) => item.id !== id);
      });
  },
});

export const { setPage, setPageSize, updateBannersWebById, setNewBannersWeb, resetBannersWebForm } = bannersWebSlice.actions;

export default bannersWebSlice.reducer;
