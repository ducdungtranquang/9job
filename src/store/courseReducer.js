/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  deleteCourse,
  getAllCourse,
  getCourseById,
} from "services/courses.service";
import { setCourseDetail } from "./courseCreaterReducer";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getCourseData = createAsyncThunk("courses/getAll",async ({ params }, { dispatch, getState }) => {
    // const state = getState();
    // const { page, per_page } = state.courses;
    dispatch(showOverlay());
    try {
      const response = await getAllCourse(params );
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch Course", error);
    }
  }
);

// get course by id
export const getCourseDataById = createAsyncThunk(
  "courses/getById",
  async (id, { dispatch }) => {
    dispatch(showOverlay());
    try {
      const response = await getCourseById(id);
      const courseDetail = response.data;
      dispatch(hideOverlay());
      dispatch(setCourseDetail(courseDetail.data)); // Dispatch the new action
      return courseDetail;
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);
// delete course by id
export const deleteCourseById = createAsyncThunk(
  "courses/deleteById",
  async ({ id, category }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteCourse(id);
      if (response.status === 200) {
        dispatch(hideOverlay());
        dispatch(getCourseData(category))
        return { data: response.data, id, category };
      }
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);

export const courseAdapter = createEntityAdapter();
const initialState = courseAdapter.getInitialState({
  courseDetail: null,
  listCourses: [],
  category: undefined,
  page: 1,
  per_page: 10,
  total_items: 0,
  total_pages: 0,
  error: null,
});

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    setNewCourseToTable: (state, action) => {
      state.listCourses.unshift(action.payload)
      state.total_items = state.listCourses.length

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseData.fulfilled, (state, action) => {
        const { data, total_items, category } = action.payload;
        state.listCourses = data;
        state.total_items = total_items;
        state.category = category;
      })
      .addCase(getCourseDataById.fulfilled, (state, action) => {
        state.courseDetail = action.payload.data;
      })
      .addCase(deleteCourseById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listCourses = state.listCourses.filter((item) => item.id !== id);
        state.total_items = state.listCourses.length

      });
  },
});

export const { setPage, setPageSize, setNewCourseToTable } = courseSlice.actions;

export default courseSlice.reducer;
