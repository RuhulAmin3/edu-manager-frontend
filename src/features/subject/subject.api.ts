import { rootApi } from "../../redux/api";

const subjectApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubjects: builder.query({
      query: (data) => ({
        url: "/subject",
        params: data,
      }),
    }),
  }),
});

export const { useGetAllSubjectsQuery, useLazyGetAllSubjectsQuery } = subjectApi;
