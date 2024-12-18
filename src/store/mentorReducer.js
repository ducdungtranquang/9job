/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";


import { SUCCESS } from "constants/StatusConstant";
import { deleteMentorById, getMentorDetailById, getMentorList, updateActiveMentorById } from "services/mentor.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getMentorData = createAsyncThunk("mentors/getAll", async ({params}, { dispatch, getState }) => {
  const state = getState();
  const { page, per_page } = state.mentors;
  dispatch(showOverlay());
  try {
    const response = await getMentorList(params);
    dispatch(hideOverlay());
    return response;
  } catch (error) {
    dispatch(hideOverlay());
    throw new Error("Failed to fetch mentor", error);
  }
}
);

// get mentor by id
export const getMentorDataById = createAsyncThunk(
  "mentors/getById",
  async (id) => {
    try {
      const response = await getMentorDetailById(id);
      return response.data;
    } catch (error) {
      return false;
    }
  }
);

// update mentor by id
export const updateMentorById = createAsyncThunk(
  "mentors/updateById",
  async ({ id, data }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await updateActiveMentorById(id, data);
      dispatch(hideOverlay());
      if (response.status === SUCCESS) {
        return { data: response.data , id: id}
      }
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);
// delete mentor by id
export const deletementorById = createAsyncThunk(
  "mentors/deleteById",
  async ({ id }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteMentorById(id);
      if (response.status === 200) {
        dispatch(hideOverlay());
        return response.data
      }
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);

export const mentorAdapter = createEntityAdapter();
const initialState = mentorAdapter.getInitialState({
  mentorDetail: null,
  listmentors: [],
  page: 1,
  per_page: 10,
  total_items: 0,
  total: 0,
  error: null,
});

export const mentorSlice = createSlice({
  name: "mentors",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    updateMentorStatus: (state, action) => {
      state.mentorDetail = { ...state.mentorDetail, active: action.payload }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMentorData.fulfilled, (state, action) => {
        const { data, total_items } = action.payload;
        state.listmentors = data;
        state.total_items = total_items;
      })
      .addCase(getMentorDataById.fulfilled, (state, action) => {
        state.mentorDetail = action.payload;
      })
      .addCase(updateMentorById.fulfilled, (state, action) => {
        const { data, id } = action.payload;
        const index = state.listmentors.findIndex(item => item.id === id);
        state.listmentors[index] = data;
      })
      .addCase(deletementorById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listmentors = state.listmentors.filter((item) => item.id !== id);
      });
  },
});

export const { setPage, setPageSize } = mentorSlice.actions;

export default mentorSlice.reducer;
