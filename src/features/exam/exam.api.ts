import { rootApi } from "../../redux/api";

const examApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExam: builder.query({
      query: (data) => ({
        url: "/exam",
        params: data,
      }),
    }),
  }),
});

export const { useGetAllExamQuery, useLazyGetAllExamQuery } = examApi;
