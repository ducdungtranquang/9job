/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  getAllCoinRefund,
  getAllCoinUsed,
  getAllCoursePurchase,
  getAllTransaction,
  getAllTransferInfo,
  updateStatusPurchase,
  updateTransferInfo,
} from "services/transaction.service";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const getTransactionData = createAsyncThunk(
  "transaction/getAllTransaction",
  async ({params}, { dispatch, getState }) => {
    const state = getState();
    const { page, per_page } = state.transactions;
    dispatch(showOverlay());
    try {
      const response = await getAllTransaction(params);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch Transaction", error);
    }
  }
);

export const getCoursePurchase = createAsyncThunk(
  "transaction/getAllCoursePurchase",
  async ({params}, { dispatch, getState }) => {
    const state = getState();
    const { page, per_page } = state.transactions;
    dispatch(showOverlay());
    try {
      const response = await getAllCoursePurchase(params);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch Course Purchase", error);
    }
  }
);

export const updateStatusCoursePurchase = createAsyncThunk(
  "transaction/getAllCoursePurchase",
  async (data) => {
    try {
      const response = await updateStatusPurchase(data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch Course", error);
    }
  }
);

export const getAllCoinUserUsed = createAsyncThunk(
  "transaction/getAllCoinUserUsed",
  async ({params}, { dispatch, getState }) => {
    const state = getState();
    const { page, per_page } = state.transactions;
    dispatch(showOverlay());
    try {
      const response = await getAllCoinUsed(params);
      dispatch(hideOverlay());
      return response.data.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch Coin refund", error);
    }
  }
);

export const getAllCoinRefundForPartner = createAsyncThunk(
  "transaction/getAllCoinRefund",
  async ({params}, { dispatch, getState }) => {
    const state = getState();
    const { page, per_page } = state.transactions;
    dispatch(showOverlay());
    try {
      const response = await getAllCoinRefund(params);
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch Coin refund", error);
    }
  }
);

export const getTransferInfoData = createAsyncThunk(
  "transaction/getTransferInfoData",
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { page, per_page } = state.transactions;
    dispatch(showOverlay());
    try {
      const response = await getAllTransferInfo({
        page,
        per_page: per_page,
        data,
      });
      dispatch(hideOverlay());
      return response.data;
    } catch (error) {
      dispatch(hideOverlay());
      throw new Error("Failed to fetch Transaction", error);
    }
  }
);
// get mentorRating by id
export const updateTransferData = createAsyncThunk(
  "tranfer/update",
  async ({ id, data }) => {
    try {
      const response = await updateTransferInfo(id, data);
      return { id, data: response.data };
    } catch (error) {
      return false;
    }
  }
);
export const courseAdapter = createEntityAdapter();
const initialState = courseAdapter.getInitialState({
  listTransaction: [],
  listCoursePurchase: [],
  listCoinUserUsed: [],
  listCoinRefundForPartner: [],
  listTransferInfo: [],
  courseDetail: null,
  category: undefined,
  page: 1,
  per_page: 10,
  total_items: 0,
  total_pages: 0,
  error: null,
});

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.per_page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionData.fulfilled, (state, action) => {
        const { data, total_items, category } = action.payload;
        state.listTransaction = data;
        state.total_items = total_items;
        state.category = category;
      })
      .addCase(getCoursePurchase.fulfilled, (state, action) => {
        const { data, total_items, category } = action.payload;
        state.listCoursePurchase = data;
        state.total_items = total_items;
        state.category = category;
      })
      .addCase(getAllCoinUserUsed.fulfilled, (state, action) => {
        const { data, total_items, category } = action.payload;
        state.listCoinUserUsed = data;
        state.total_items = total_items;
        state.category = category;
      })
      .addCase(getAllCoinRefundForPartner.fulfilled, (state, action) => {
        const { data, total_items, category } = action.payload;
        state.listCoinRefundForPartner = data;
        state.total_items = total_items;
        state.category = category;
      })
      .addCase(getTransferInfoData.fulfilled, (state, action) => {
        const { data, total_items, category } = action.payload;
        state.listTransferInfo = data;
        state.total_items = total_items;
        state.category = category;
      })
      .addCase(updateTransferData.fulfilled, (state, action) => {
        const { data, id } = action.payload;
        const index = state.listTransferInfo.findIndex(item => item.id === id);
        state.listTransferInfo[index] = { ...state.listTransferInfo[index], ...data };
      })
  },
});

export const { setPage, setPageSize } = transactionSlice.actions;

export default transactionSlice.reducer;
