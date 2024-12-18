/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { SUCCESS } from "constants/StatusConstant";
import { deleteContactById, getContactById, getContactList, updateContactById } from "services/contact.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getContactMailData = createAsyncThunk("contacts/getAll", async ({params}, { dispatch, getState }) => {
  dispatch(showOverlay());
  try {
    const response = await getContactList(params);
    dispatch(hideOverlay());
    return response;
  } catch (error) {
    dispatch(hideOverlay());
    throw new Error("Failed to fetch mentor", error);
  }
}
);

// get mentor by id
export const getContactMailDataById = createAsyncThunk(
  "contacts/getById",
  async (id) => {
    try {
      const response = await getContactById(id);
      return response.data;
    } catch (error) {
      return false;
    }
  }
);

// update mentor by id
export const updateContactDataById = createAsyncThunk(
  "contacts/updateById",
  async ({ id, data }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await updateContactById(id, data);
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
export const deleteContactDataById = createAsyncThunk(
  "contacts/deleteById",
  async ({ id }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deleteContactById(id);
      if (response.status === 200) {
        dispatch(hideOverlay());
        return {id: id}
      }
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);

export const mentorAdapter = createEntityAdapter();
const initialState = mentorAdapter.getInitialState({
  contactDetail: null,
  listcontacts: [],
  page: 1,
  per_page: 10,
  total_items: 0,
  total_pages: 0,
  error: null,
});

export const contactslice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    // updateContactstatus: (state, action) => {
    //   state.contactDetail = { ...state.contactDetail, active: action.payload }
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContactMailData.fulfilled, (state, action) => {
        const { data, total_items } = action.payload;
        state.listcontacts = data;
        state.total_items = total_items;
      })
      .addCase(getContactMailDataById.fulfilled, (state, action) => {
        state.contactDetail = action.payload;
      })
      .addCase(updateContactDataById.fulfilled, (state, action) => {
        const { data, id } = action.payload;
        const index = state.listcontacts.findIndex(item => item.id === id);
        state.listcontacts[index] = data;
      })
      .addCase(deleteContactDataById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listcontacts = state.listcontacts.filter((item) => item.id !== id);
      });
  },
});

export const { setPage, setPageSize } = contactslice.actions;

export default contactslice.reducer;
