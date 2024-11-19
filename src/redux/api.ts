/**
 * External Dependency
 */
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

/**
 * Internal Dependency
 */

import { ACCESS_TOKEN_KEY } from "../common/constants/local-storage.constant";
import { ResponseErrorType } from "../common/types/response.type";
import { logout } from "../features/auth/login/login.slice";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../common/utils/local-storage.utils";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://edu-manager-server.vercel.app/api/v1/",
  prepareHeaders: (headers) => {
    const token = getFromLocalStorage(ACCESS_TOKEN_KEY);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // transform response Error
  if (result.error) {
    const errorData: ResponseErrorType = result.error.data as ResponseErrorType;
    result.error = {
      status: errorData?.statusCode || 500,
      data: errorData?.message || "something was wrong",
    };
  }

  if (result.error && result.error.status == 401) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Save new access token
      const newToken = (refreshResult.data as { accessToken: string })
        .accessToken;
      saveToLocalStorage(ACCESS_TOKEN_KEY, newToken);

      // Retry the initial request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes:["subject"]
});
