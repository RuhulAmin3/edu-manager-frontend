import { rootApi } from "../../redux/api";

const classApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClass: builder.query({
      query: (data) => ({
        url: "/class",
        params: data,
      }),
    }),
  }),
});

export const { useGetAllClassQuery } = classApi;
