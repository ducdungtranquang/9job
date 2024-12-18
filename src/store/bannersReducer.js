/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { deleteBanner, getAllBanners, getBannerById } from "services/banners.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getBannersData = createAsyncThunk( "bannerss/getAll",
  async ({ params }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await getAllBanners(params);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch Banners", error);
    }
  }
);

// get Banners by id
export const getBannersByIdData = createAsyncThunk(
  "bannerss/getById",
  async (id, { dispatch }) => {
    dispatch(showOverlay());
    try {
      const response = await getBannerById(id);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);



// delete Banners by id
export const deleteBannersById = createAsyncThunk(
  "bannerss/deleteById",
  async ({ id, category }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteBanner(id);
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

export const bannersAdapter = createEntityAdapter();
const initialState = bannersAdapter.getInitialState({
  listBanners: [],
  bannersDetail: null,
  page: 1,
  per_page: 10,
  total_items: 100,
  total_pages: 0,
});

export const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    resetBannersForm: (state, action) => {
      state.bannersDetail =null
    },
    setNewBanners: (state, action) => {
      state.listBanners.unshift(action.payload)
      state.total_items = state.listBanners.length

    },
    updateBannersById: (state, action) => {
      const { data, id } = action.payload;
      const index = state.listBanners.findIndex(item => item.id === id);
      state.listBanners[index] = data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBannersData.fulfilled, (state, action) => {
        const { data, total_items } = action.payload;
        state.listBanners = data || [];
        state.total_items = total_items || 0;
      })
      .addCase(getBannersByIdData.fulfilled, (state, action) => {
        console.log('action: ', action.payload);
        state.bannersDetail = action.payload.data;
      })
      .addCase(deleteBannersById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listBanners = state.listBanners.filter((item) => item.id !== id);
        state.total_items = state.listBanners.length

      });
  },
});

export const { setPage, setPageSize, updateBannersById, setNewBanners, resetBannersForm } = bannersSlice.actions;

export default bannersSlice.reducer;
