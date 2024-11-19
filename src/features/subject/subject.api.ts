import { rootApi } from "../../redux/api";

const subjectApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubjects: builder.query({
      query: (data) => ({
        url: "/subject",
        params: data,
      }),
      providesTags: ["subject"],
    }),

    getSubject: builder.query({
      query: (id) => ({
        url: `/subject/${id}`,
      }),
      providesTags: ["subject"],
    }),

    addSubject: builder.mutation({
      query: (data) => ({
        url: "/subject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subject"],
    }),

    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `/subject/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subject"],
    }),

    EditSubject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subject/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["subject"],
    }),
  }),
});

export const {
  useGetAllSubjectsQuery,
  useAddSubjectMutation,
  useDeleteSubjectMutation,
  useEditSubjectMutation,
  useGetSubjectQuery,
} = subjectApi;
