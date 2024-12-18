/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { deleteCareerDocumentById, getCareerDocumentById, getCareerDocumentList } from "services/careerDocument.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getCareerDocumentlData = createAsyncThunk("careerDocument/getAll", async ({ params }, { dispatch, getState }) => {
  dispatch(showOverlay());
  try {
    const response = await getCareerDocumentList(params);
    dispatch(hideOverlay());
    return response;
  } catch (error) {
    dispatch(hideOverlay());
    throw new Error("Failed to fetch career", error);
  }
}
);

// get career by id
export const getCareerDocumentlDataById = createAsyncThunk(
  "careerDocument/getById",
  async (id) => {
    try {
      const response = await getCareerDocumentById(id);
      return response.data;
    } catch (error) {
      return false;
    }
  }
);


// delete career by id
export const deleteCareerDocumentDataById = createAsyncThunk(
  "careerDocument/deleteById",
  async ({ id }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteCareerDocumentById(id);
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

export const careerAdapter = createEntityAdapter();
const initialState = careerAdapter.getInitialState({
  detail: null,
  listCareerDocument: [],
  page: 1,
  per_page: 10,
  total_items: 0,
  total_pages: 0,
  error: null,
});

export const careerDocumentSlice = createSlice({
  name: "careerDocument",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    resetForm: (state, action) => {
      state.detail = null
    },
    setNewData: (state, action) => {
      state.listCareerDocument.unshift(action.payload)
    },
    updateData: (state, action) => {
      const { data, id } = action.payload;
      const index = state.listCareerDocument.findIndex(item => item.id === id);
      state.listCareerDocument[index] = data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCareerDocumentlData.fulfilled, (state, action) => {
        const { data, total_items } = action.payload;
        state.listCareerDocument = data;
        state.total_items = total_items;
      })
      .addCase(getCareerDocumentlDataById.fulfilled, (state, action) => {
        state.detail = action.payload;
      })
      .addCase(deleteCareerDocumentDataById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listCareerDocument = state.listCareerDocument.filter((item) => item.id !== id);
      });
  },
});

export const { setPage, setPageSize, resetForm, setNewData, updateData } = careerDocumentSlice.actions;

export default careerDocumentSlice.reducer;
