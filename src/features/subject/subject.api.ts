import { rootApi } from "../../redux/api";

const subjectApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubjects: builder.query({
      query: (data) => ({
        url: "/subject",
        params: data,
      }),
       providesTags:["subject"],
    }),

    addSubject:builder.mutation({
      query:(data)=>({
        url:"/subject", 
        method:"POST", 
        body:data,
      }),
      invalidatesTags:["subject"],
    })
  }),
});

export const { useGetAllSubjectsQuery, useLazyGetAllSubjectsQuery, useAddSubjectMutation } = subjectApi;
