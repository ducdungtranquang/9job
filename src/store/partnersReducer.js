/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { deletePartner, getAllPartners, getPartnerById } from "services/partners.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getPartnersData = createAsyncThunk( "partners/getAll",
  async ({ params }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await getAllPartners(params);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch Partners", error);
    }
  }
);

// get Partners by id
export const getPartnersByIdData = createAsyncThunk(
  "partners/getById",
  async (id, { dispatch }) => {
    dispatch(showOverlay());
    try {
      const response = await getPartnerById(id);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);



// delete Partners by id
export const deletePartnersById = createAsyncThunk(
  "partners/deleteById",
  async ({ id, category }, { dispatch, getState }) => {
    dispatch(showOverlay());
    try {
      const response = await deletePartner(id);
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

export const partnersAdapter = createEntityAdapter();
const initialState = partnersAdapter.getInitialState({
  listPartners: [],
  partnerDetail: null,
  page: 1,
  per_page: 10,
  total_items: 100,
  total_pages: 0,
});

export const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
    resetPartnersForm: (state, action) => {
      state.partnerDetail =null
    },
    setNewPartners: (state, action) => {
      state.listPartners.unshift(action.payload)
      state.total_items = state.listPartners.length
    },
    updatePartnersById: (state, action) => {
      const { data, id } = action.payload;
      const index = state.listPartners.findIndex(item => item.id === id);
      state.listPartners[index] = data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPartnersData.fulfilled, (state, action) => {
        const { data, total_items } = action.payload;
        state.listPartners = data || [];
        state.total_items = total_items || 0;
      })
      .addCase(getPartnersByIdData.fulfilled, (state, action) => {
        console.log('action: ', action.payload);
        state.partnerDetail = action.payload.data;
      })
      .addCase(deletePartnersById.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.listPartners = state.listPartners.filter((item) => item.id !== id);
        state.total_items = state.listPartners.length

      });
  },
});

export const { setPage, setPageSize, updatePartnersById, setNewPartners, resetPartnersForm } = partnersSlice.actions;

export default partnersSlice.reducer;
