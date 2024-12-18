/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { deleteHandbook, getAllHandbook, getHandbookById } from "services/hanbook.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getHandBookData = createAsyncThunk( "handbooks/getAll",
  async ({ params }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await getAllHandbook(params);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch HandBook", error);
    }
  }
);

// get HandBook by id
export const getHandbookByIdData = createAsyncThunk(
  "handbooks/getById",
  async (id, { dispatch }) => {
    dispatch(showOverlay());
    try {
      const response = await getHandbookById(id);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);



// delete HandBook by id
export const deleteHandBookById = createAsyncThunk(
  "handbooks/deleteById",
  async ({ id, category }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteHandbook(id);
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

export const handbookAdapter = createEntityAdapter();
const initialState = handbookAdapter.getInitialState({
  listHandBook: [],
  handbookDetail: null,
  category: undefined,
  page: 1,
  per_page: 10,
  total_items: 100,
  total_pages: 0,
  error: null,
});

export const handBookSlice = createSlice({
  name: "handbooks",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    resetHandbookForm: (state, action) => {
      state.handbookDetail =null
    },
    setNewHandbook: (state, action) => {
      state.listHandBook.unshift(action.payload)
      state.total_items = state.listHandBook.length

    },
    updateHandbookById: (state, action) => {
      const { data, id } = action.payload;
      const index = state.listHandBook.findIndex(item => item.id === id);
      state.listHandBook[index] = data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHandBookData.fulfilled, (state, action) => {
        const { data, total_item } = action.payload;
        state.listHandBook = data || [];
        state.total_items = total_item || 0;
      })
      .addCase(getHandbookByIdData.fulfilled, (state, action) => {
        console.log('action: ', action.payload);
        state.handbookDetail = action.payload.data;
      })
      .addCase(deleteHandBookById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listHandBook = state.listHandBook.filter((item) => item.id !== id);
        state.total_items = state.listHandBook.length

      });
  },
});

export const { setPage, setPageSize, updateHandbookById, setNewHandbook, resetHandbookForm } = handBookSlice.actions;

export default handBookSlice.reducer;
