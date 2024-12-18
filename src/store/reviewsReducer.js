/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { deleteReview, getAllReviews, getReviewById } from "services/reviews.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getReviewsData = createAsyncThunk( "reviews/getAll",
  async ({ params }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await getAllReviews(params);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch Reviews", error);
    }
  }
);

// get Reviews by id
export const getReviewsByIdData = createAsyncThunk(
  "reviews/getById",
  async (id, { dispatch }) => {
    dispatch(showOverlay());
    try {
      const response = await getReviewById(id);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);



// delete Reviews by id
export const deleteReviewsById = createAsyncThunk(
  "reviews/deleteById",
  async ({ id, category }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteReview(id);
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

export const reviewsAdapter = createEntityAdapter();
const initialState = reviewsAdapter.getInitialState({
  listReviews: [],
  reviewDetail: null,
  page: 1,
  per_page: 10,
  total_items: 10,
  total_pages: 0,
});

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    resetReviewsForm: (state, action) => {
      state.reviewDetail =null
    },
    setNewReviews: (state, action) => {
      state.listReviews.unshift(action.payload)
      state.total_items = state.listReviews.length
    },
    updateReviewsById: (state, action) => {
      const { data, id } = action.payload;
      const index = state.listReviews.findIndex(item => item.id === id);
      state.listReviews[index] = data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsData.fulfilled, (state, action) => {
        const { data, total_items } = action.payload;
        state.listReviews = data || [];
        state.total_items = total_items || 0;
      })
      .addCase(getReviewsByIdData.fulfilled, (state, action) => {
        state.reviewDetail = action.payload.data;
      })
      .addCase(deleteReviewsById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listReviews = state.listReviews.filter((item) => item.id !== id);
        state.total_items = state.listReviews.length

      });
  },
});

export const { setPage, setPageSize, updateReviewsById, setNewReviews, resetReviewsForm } = reviewsSlice.actions;

export default reviewsSlice.reducer;
