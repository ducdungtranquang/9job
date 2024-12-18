/* eslint-disable no-unused-expressions */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { deleteInstructor, getInstructorById, getInstructors } from "services/instructor.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

// get all instructor
export const getInstructorList = createAsyncThunk("instructor/getall",async ({params}, { dispatch, getState }) => {

    try {
      const response = await getInstructors(params);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch HandBook", error);
    }
  }
);
// get HandBook by id
export const getInstructorByIdData = createAsyncThunk(
  "instructor/getById",
  async (id, { dispatch }) => {
    dispatch(showOverlay());
    try {
      const response = await getInstructorById(id);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);



// delete HandBook by id
export const deleteInstructorById = createAsyncThunk(
  "instructor/deleteById",
  async ({ id, category }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteInstructor(id);
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
export const instructorAdapter = createEntityAdapter();

const initialState = instructorAdapter.getInitialState({
  intructorData: [],
  introductorDetail: null,
  page: 1,
  per_page: 10,
  total_items: 100,
});

const instructorSlice = createSlice({
  name: "instructors",
  initialState,
  reducers: {
    getAllInstructors: (state, action) => {
      state.intructorData = action.payload.data;
      state.total_items = action.payload.total_items;
    },
    resetInstructorForm: (state, action) => {
      state.introductorDetail = null
    },
    setNewInstructor: (state, action) => {
      state.intructorData.unshift(action.payload)
    },
    updateInstructorById: (state, action) => {
      const { data, id } = action.payload;
      const index = state.intructorData.findIndex(item => item.id === id);
      state.intructorData[index] = data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInstructorList.fulfilled, (state, action) => {
        state.intructorData = action.payload.data;
        state.total_items = action.payload.total_items;
      })  
      .addCase(getInstructorByIdData.fulfilled, (state, action) => {
        state.introductorDetail = action.payload.data;
      })
      .addCase(deleteInstructorById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.intructorData = state.intructorData.filter((item) => item.id !== id);
      });
  },
});
export const { resetInstructorForm, setNewInstructor, updateInstructorById, getAllInstructors } = instructorSlice.actions;

const instructorReducer = instructorSlice.reducer;

export default instructorReducer;
