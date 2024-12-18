/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { initialRoadmap } from "constants/RoutemapConstant";
import { deleteCareerRoutemapById, getCareerRoutemapById, getCareerRoutemapList } from "services/careerRoute.service";
import { v4 as uuidv4 } from "uuid";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getRoutemaplData = createAsyncThunk("routemap/getAll", async ({ params }, { dispatch, getState }) => {
  const state = getState();
  const { page, per_page } = state.careerRoutemap;
  dispatch(showOverlay());
  try {
    const response = await getCareerRoutemapList({ page, per_page: per_page, ...params });
    dispatch(hideOverlay());
    return response;
  } catch (error) {
    dispatch(hideOverlay());
    throw new Error("Failed to fetch mentor", error);
  }
}
);


// get mentor by id
export const getRoutemaplDataById = createAsyncThunk(
  "routemap/getById",
  async (id) => {
    try {
      const response = await getCareerRoutemapById(id);
      return response.data;
    } catch (error) {
      return false;
    }
  }
);


// delete mentor by id
export const deleteRoutemapDataById = createAsyncThunk(
  "routemap/deleteById",
  async ({ id }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteCareerRoutemapById(id);
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
const mappingProcessDetail = (dataArray) => {
  let newDataArray = [];
  dataArray.forEach((item, index) => {
    Object.keys(item).forEach((key) => {
      initialRoadmap.forEach((initData) => {
        if (initData.key == key) {
          newDataArray.push({
            ...initData,
            id: uuidv4(),
            oldId: item?.id,
            disabled: false,
            value: item[key] || initData.value,
            groupId: index + 1,
          });
        }
      });
    });
  });
  return newDataArray;
};
export const mentorAdapter = createEntityAdapter();
const initialState = mentorAdapter.getInitialState({
  detail: null,
  processDetail: initialRoadmap,
  listRoutemap: [],
  page: 1,
  per_page: 10,
  total_items: 0,
  total_pages: 0,
  error: null,
});

export const routemapSlice = createSlice({
  name: "careerRoutemap",
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
    resetProcessDetail: (state, action) => {
      state.processDetail = initialRoadmap
    },
    setNewData: (state, action) => {
      state.listRoutemap.unshift(action.payload)
      state.total_items = state.listRoutemap.length
    },
    updateData: (state, action) => {
      const { data, id } = action.payload;
      const index = state.listRoutemap.findIndex(item => item.id === id);
      state.listRoutemap[index] = data;
    },
    addMoreRoadmap: (state, action) => {
      const maxGroupId = state.processDetail.reduce(
        (max, item) => Math.max(max, item.groupId),
        0
      );
      // Increment the maxGroupId for each new group
      const newGroupId = maxGroupId + 1;
      const newEntries = initialRoadmap.map((item) => {
        const newItem = {
          ...item,
          id: uuidv4(),
          groupId: newGroupId, // Use the newGroupId for each new group
        };
        return newItem;
      });
      state.processDetail.push(...newEntries);
    },
    decreaseRoadmap: (state, action) => {
      const id = action.payload;

      state.processDetail = state.processDetail.filter(
        (item) => item.groupId !== id
      );
    },
    setRoadmapChange: (state, action) => {
      const { id, value } = action.payload;

      const index = state.processDetail.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.processDetail[index].value = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoutemaplData.fulfilled, (state, action) => {
        const { data, total_items } = action.payload;
        state.listRoutemap = data;
        state.total_items = total_items;
      })
      .addCase(getRoutemaplDataById.fulfilled, (state, action) => {
        state.detail = action.payload;
        if (action.payload?.career_roadmap_process && action.payload?.career_roadmap_process.length > 0
        ) {
          state.processDetail = mappingProcessDetail(action.payload?.career_roadmap_process);
        }
      })
      .addCase(deleteRoutemapDataById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listRoutemap = state.listRoutemap.filter((item) => item.id !== id);
        state.total_items = state.listRoutemap.length

      });
  },
});

export const { setPage, setPageSize, resetForm, setNewData, updateData, addMoreRoadmap, decreaseRoadmap, setRoadmapChange, resetProcessDetail } = routemapSlice.actions;

export default routemapSlice.reducer;
