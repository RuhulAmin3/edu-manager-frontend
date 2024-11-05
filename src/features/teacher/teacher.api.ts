import { rootApi } from "../../redux/api";

const teacherApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeachers: builder.query({
      query: (data) => ({
        url: "/teacher",
        params: data,
      }),
    }),
  }),
});

export const { useGetAllTeachersQuery } = teacherApi;
