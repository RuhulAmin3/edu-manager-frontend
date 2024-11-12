import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "../features/auth/login/login.slice";
import { rootApi } from "./api";

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
