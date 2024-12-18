/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { deleteFanpage, getAllFanpage, getFanpageById } from "services/fanpage.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getFanpageData = createAsyncThunk( "fanpage/getAll",
  async ({ params }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await getAllFanpage(params);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch Fanpage", error);
    }
  }
);

// get Fanpage by id
export const getFanpageByIdData = createAsyncThunk(
  "fanpage/getById",
  async (id, { dispatch }) => {
    dispatch(showOverlay());
    try {
      const response = await getFanpageById(id);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);



// delete Fanpage by id
export const deleteFanpageById = createAsyncThunk(
  "fanpage/deleteById",
  async ({ id, category }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteFanpage(id);
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

export const fanpageAdapter = createEntityAdapter();
const initialState = fanpageAdapter.getInitialState({
  listFanpage: [],
  fanpageDetail: null,
  page: 1,
  per_page: 30,
  total_items: 100,
  total_pages: 0,
});

export const fanpageSlice = createSlice({
  name: "fanpages",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    resetFanpageForm: (state, action) => {
      state.fanpageDetail =null
    },
    setNewFanpage: (state, action) => {
      state.listFanpage.unshift(action.payload)
      state.total_items = state.listFanpage.length
    },
    updateFanpageById: (state, action) => {
      const { data, id } = action.payload;
      const index = state.listFanpage.findIndex(item => item.id === id);
      state.listFanpage[index] = data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFanpageData.fulfilled, (state, action) => {
        const { data, total_items } = action.payload;
        state.listFanpage = data || [];
        state.total_items = total_items || 0;
      })
      .addCase(getFanpageByIdData.fulfilled, (state, action) => {
        state.fanpageDetail = action.payload.data;
      })
      .addCase(deleteFanpageById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listFanpage = state.listFanpage.filter((item) => item.id !== id);
        state.total_items = state.listFanpage.length

      });
  },
});

export const { setPage, setPageSize, updateFanpageById, setNewFanpage, resetFanpageForm } = fanpageSlice.actions;

export default fanpageSlice.reducer;
