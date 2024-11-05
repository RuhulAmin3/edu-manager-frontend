import { rootApi } from "../../redux/api";

const guardianApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGuardian: builder.query({
      query: (data) => ({
        url: "/guardian",
        params: data,
      }),
    }),
  }),
});

export const { useGetAllGuardianQuery } = guardianApi;
