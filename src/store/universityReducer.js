/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { deleteUniversity, getUniversityById, getUniversityList, getUniversityListByAdmin } from "services/university.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getUniversityData = createAsyncThunk("universities/getAll", async () => {

  try {
    const response = await getUniversityList();
    return response;
  } catch (error) {

    throw new Error("Failed to fetch mentor", error);
  }
}
);

export const getUniversityDataFromAdmin = createAsyncThunk("universities/getAllFromAdmin", async ({ params }, { dispatch, getState }) => {
  const state = getState();
  const { page, per_page } = state.universities;
  dispatch(showOverlay());
  try {
    const response = await getUniversityListByAdmin({ page, per_page, ...params });
    dispatch(hideOverlay());
    return response;


  } catch (error) {
    dispatch(hideOverlay());

    throw new Error("Failed to fetch mentor", error);
  }
}
);
// get mentor by id
export const getUniversityDataById = createAsyncThunk(
  "universities/getById",
  async (id) => {
    try {
      const response = await getUniversityById(id);
      return response.data;
    } catch (error) {
      return false;
    }
  }
);


// delete University by id
export const deleteUniversityById = createAsyncThunk(
  "university/deleteById",
  async ({ id }) => {
    try {
      const response = await deleteUniversity(id);
      if (response.status === 200) {
        return { id: id }
      }
    } catch (error) {

      return false;
    }
  }
);

export const mentorAdapter = createEntityAdapter();
const initialState = mentorAdapter.getInitialState({
  universityDetail: null,
  listUniversities: [],
  page: 1,
  per_page: 10,
  total_items: 0,
  total_pages: 0,
  error: null,
});

export const universitieslice = createSlice({
  name: "universities",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    resetUniversityForm: (state, action) => {
      state.reviewDetail = null
    },
    setNewUniversity: (state, action) => {
      state.listUniversities.unshift(action.payload)
    },
    updateUniversityById: (state, action) => {
      const { data, id } = action.payload;
      const index = state.listUniversities.findIndex(item => item.id === id);
      state.listUniversities[index] = data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUniversityData.fulfilled, (state, action) => {
        state.listUniversities = action.payload;
        // state.total_items = total_items;
      })
      .addCase(getUniversityDataFromAdmin.fulfilled, (state, action) => {
        const { data, total_items } = action.payload
        state.listUniversities = data;
        state.total_items = total_items;
      })
      .addCase(getUniversityDataById.fulfilled, (state, action) => {
        state.universityDetail = action.payload;
      })
      .addCase(deleteUniversityById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listUniversities = state.listUniversities.filter((item) => item.id !== id);
      });
  },
});

export const { setPage, setPageSize, resetUniversityForm, setNewUniversity, updateUniversityById } = universitieslice.actions;

export default universitieslice.reducer;
