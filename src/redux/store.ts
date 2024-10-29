import { configureStore } from "@reduxjs/toolkit";
import { rootApi } from "./api";
import { authReducer } from "../features/auth/login/login.slice";

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
