import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../common/utils/local-storage.utils";
import { ACCESS_TOKEN_KEY } from "../common/constants/local-storage.constant";
import { ResponseErrorType } from "../common/types/response.type";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1/",
  prepareHeaders: (headers) => {
    const token = getFromLocalStorage(ACCESS_TOKEN_KEY);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
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
      status: errorData.statusCode || 500,
      data: errorData.message || "something was wrong",
    };
    // console.log("error from api bottom", result.error);
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
      // If refresh failed, you might want to log out or handle re-authentication
      console.error("Refresh token failed, redirecting to login");
    }
  }
  return result;
};

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
