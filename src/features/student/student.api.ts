import { rootApi } from "../../redux/api";

const studentApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (data) => ({
        url: "/student",
        params: data,
      }),
    }),
  }),
});

export const { useGetAllStudentsQuery } = studentApi;
