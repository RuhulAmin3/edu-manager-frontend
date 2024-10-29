import { rootApi } from "../../../redux/api";

const loginApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginApi;
