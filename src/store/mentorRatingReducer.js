/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";


import { deleteRatingById, getMentorRatingDetailById, getMentorRatingList, updateMentorRatingById } from "services/mentorRatings.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getMentorRatingData = createAsyncThunk("mentorRatings/getAll", async (_, { dispatch, getState }) => {
  const state = getState();
  const { page, per_page } = state.mentorRatings;
  dispatch(showOverlay());
  try {
    const response = await getMentorRatingList({
      page,
      per_page: per_page,
    });
    dispatch(hideOverlay());
    return response;
  } catch (error) {
    dispatch(hideOverlay());
    throw new Error("Failed to fetch mentorRating", error);
  }
}
);

// get mentorRating by id
export const getMentorRatingDataById = createAsyncThunk(
  "mentorRatings/getById",
  async (id) => {
    try {
      const response = await getMentorRatingDetailById(id);
      return response.data;
    } catch (error) {
      return false;
    }
  }
);
// get mentorRating by id
export const updateMentorRatingData = createAsyncThunk(
  "mentorRatings/update",
  async ({ id, data }) => {
    try {
      const response = await updateMentorRatingById(id, data);
      return { id, data: response.data };
    } catch (error) {
      return false;
    }
  }
);


// delete mentorRating by id
export const deletementorRatingById = createAsyncThunk(
  "mentorRatings/deleteById",
  async ({ id }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteRatingById(id);
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

export const mentorRatingAdapter = createEntityAdapter();
const initialState = mentorRatingAdapter.getInitialState({
  mentorRatingDetail: null,
  listmentorRatings: [],
  page: 1,
  per_page: 10,
  total_items: 0,
  total: 0,
  error: null,
});

export const mentorRatingSlice = createSlice({
  name: "mentorRatings",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    resetMentorRatingForm: (state, action) => {
      state.mentorRatingDetail = null
    },
    setNewMentorRating: (state, action) => {
      state.listmentorRatings.unshift(action.payload)
    },
    // updateMentorRatingById: (state, action) => {
    //   const { data, id } = action.payload;
    //   const index = state.listmentorRatings.findIndex(item => item.id === id);
    //   state.listmentorRatings[index] = data;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMentorRatingData.fulfilled, (state, action) => {
        const { data, total_items } = action.payload;
        state.listmentorRatings = data;
        state.total_items = total_items;
      })
      .addCase(getMentorRatingDataById.fulfilled, (state, action) => {
        state.mentorRatingDetail = action.payload;
      })
      .addCase(updateMentorRatingData.fulfilled, (state, action) => {
        const { data, id } = action.payload;
        const index = state.listmentorRatings.findIndex(item => item.id === id);
        state.listmentorRatings[index] = { ...state.listmentorRatings[index], ...data };
      })
      .addCase(deletementorRatingById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listmentorRatings = state.listmentorRatings.filter((item) => item.id !== id);
        state.total_items = listmentorRatings.length;
      });
  },
});

export const { setPage, setPageSize, resetMentorRatingForm, setNewMentorRating } = mentorRatingSlice.actions;

export default mentorRatingSlice.reducer;
