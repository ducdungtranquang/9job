/* eslint-disable eqeqeq */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialContentCard } from "constants/ActivityConstant";
import {
  deleteActivity,
  getActivityById,
  getAllActivities,
} from "services/activity.service";
import { v4 as uuidv4 } from "uuid";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const fetchActivities = createAsyncThunk("activities/getallactivity",
  async (param, { dispatch, getState }) => {

    dispatch(showOverlay());
    try {
      const response = await getAllActivities(param);
      dispatch(hideOverlay());
      return response.data.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch Activity", error);
    }

  }
);

// get Activity by id
export const getActivityByIdData = createAsyncThunk(
  "activitys/getById",
  async (id) => {
    try {
      const response = await getActivityById(id);
      return response.data;
    } catch (error) {
      return false;
    }
  }
);

// delete Activity by id
export const deleteActivityById = createAsyncThunk(
  "activitys/deleteById",
  async ({ id }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteActivity(id);
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

const mappingActivityCard = (dataArray) => {
  let newDataArray = [];
  dataArray.forEach((item, index) => {
    Object.keys(item).forEach((key) => {
      // Create a copy of initialContentCard before sorting it
      initialContentCard.forEach((initData) => {
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
  // Sort newDataArray after all elements have been inserted
  // newDataArray.sort((a, b) => ( a.order - b.order));
  // console.log('newDataArray: ', newDataArray);
  return newDataArray;
};

const initialState = {
  listActivities: [],
  activityDetail: null,
  page: 1,
  per_page: 10,
  total_items: 0,
  activityCards: initialContentCard,
};

const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.per_page = action.payload;
    },
    resetActivityForm: (state, action) => {
      state.activityDetail = null;
      state.activityCards = initialContentCard;
    },
    setNewActivity: (state, action) => {
      state.listActivities.unshift(action.payload)
      state.total_items = state.listActivities.length
    },
    updateActivityById: (state, action) => {
      const { data, id } = action.payload;
      const index = state.listActivities.findIndex(item => item.id === id);
      state.listActivities[index] = data;
    },
    addMoreCard: (state, action) => {
      const maxGroupId = state.activityCards.reduce(
        (max, item) => Math.max(max, item.groupId),
        0
      );
      // Increment the maxGroupId for each new group
      const newGroupId = maxGroupId + 1;
      const newEntries = initialContentCard.map((item) => {
        const newItem = {
          ...item,
          id: uuidv4(),
          groupId: newGroupId, // Use the newGroupId for each new group
        };
        return newItem;
      });
      state.activityCards.push(...newEntries);
    },
    decreaseCard: (state, action) => {
      const id = action.payload;

      state.activityCards = state.activityCards.filter((item) => item.groupId !== id);
    },
    setCardChange: (state, action) => {
      const { id, value } = action.payload;

      const index = state.activityCards.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.activityCards[index].value = value;
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.listActivities = action.payload.data;
        state.total_items = action.payload.total_items;
      })
      .addCase(getActivityByIdData.fulfilled, (state, action) => {
        const { data } = action.payload
        state.activityDetail = data;
        if (data?.cards && data?.cards.length > 0) {
          state.activityCards = mappingActivityCard(data?.cards);
        }
      })
      .addCase(deleteActivityById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listActivities = state.listActivities.filter((item) => item.id !== id);
        state.total_items = state.listActivities.length

      });

  },
});

export const { setPage, setPageSize, resetActivityForm, addMoreCard, decreaseCard, setCardChange,
  setNewActivity, updateActivityById
 } = activitySlice.actions;
export default activitySlice.reducer;
