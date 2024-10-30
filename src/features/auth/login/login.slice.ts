// external imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// internal imports
import { RootState } from "../../../redux/store";
import {
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../../../common/utils/local-storage.utils";
import {
  ACCESS_TOKEN_KEY,
  USER,
} from "../../../common/constants/local-storage.constant";

// Define types for the initial state
interface AuthState {
  user: Record<string, string> | null;
  token: string | null;
}

const authInitialValue: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialValue,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: Record<string, string> | null;
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      saveToLocalStorage(ACCESS_TOKEN_KEY, action.payload.token);
      saveToLocalStorage(USER, action.payload.user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeFromLocalStorage(ACCESS_TOKEN_KEY);
      removeFromLocalStorage(USER);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const loggedInUser = (state: RootState) => state.auth.user;
export const currentToken = (state: RootState) => state.auth.token;
