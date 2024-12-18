/* eslint-disable no-unused-expressions */
import {
  createEntityAdapter,
  createSlice
} from "@reduxjs/toolkit";
import { AUTHENTICATION } from "constants/AuthConstant";
import { ADMIN_ROLE } from "constants/RoleConstant";
import { removeFromCookieStorage, saveToCookieStorage } from "utils/cookie";
import { getFromLocalStorage, removeFromLocalStorage, setLocalStorage } from "utils/local-storage";


export const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  isAuth: getFromLocalStorage(AUTHENTICATION)?.roles?.includes(ADMIN_ROLE),
  user: null,
  message: "",
  loading: false,
  infoVerifyRequest: null,
  intructorData: []
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { user, roles, access_token } = action.payload;
      state.user = { user, roles };
      state.isAuth = roles?.includes(ADMIN_ROLE);
      setLocalStorage(AUTHENTICATION, { user, roles });
      saveToCookieStorage(AUTHENTICATION, access_token);
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.isAuth = false;
      removeFromLocalStorage(AUTHENTICATION);
      removeFromCookieStorage(AUTHENTICATION);
    },
    getUserData: (state, action) => {
      const userData = getFromLocalStorage(AUTHENTICATION);
      if (userData) {
        state.user = userData;
        state.isAuth = userData?.roles?.includes(ADMIN_ROLE);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      
  },
});
export const { loginUser, logoutUser, getUserData } = userSlice.actions;

const userReducer = userSlice.reducer;

// Selector to check if user is authenticated
export const selectIsAuthenticated = (state) => state.user.isAuth;

export default userReducer;
