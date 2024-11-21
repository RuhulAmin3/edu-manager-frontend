import { rootApi } from "../../redux/api";

const examApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all exams
    getAllExams: builder.query({
      query: (data) => ({
        url: "/exam",
        params: data,
      }),
      providesTags: ["exam"],
    }),

    // Get a single exam
    getExam: builder.query({
      query: (id) => ({
        url: `/exam/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "exam", id }],
    }),

    // Add a new exam
    addExam: builder.mutation({
      query: (data) => ({
        url: "/exam",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["exam"], // Pessimistic update
    }),

    // Update an exam
    updateExam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/exam/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "exam", id }], // Pessimistic update
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        // Optimistic Update
        const patchResult = dispatch(
          examApi.util.updateQueryData("getAllExams", undefined, (draft) => {
            const exam = draft?.find((item:Record<string, unknown>) => item.id === id);
            if (exam) {
              Object.assign(exam, data);
            }
          })
        );

        try {
          await queryFulfilled; // Wait for API response
        } catch {
          patchResult.undo(); // Rollback on failure
        }
      },
    }),

    // Delete an exam
    deleteExam: builder.mutation({
      query: (id) => ({
        url: `/exam/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["exam"], // Pessimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistic Update
        const patchResult = dispatch(
          examApi.util.updateQueryData("getAllExams", undefined, (draft) => {
            return draft?.filter((exam:Record<string, unknown>) => exam.id !== id);
          })
        );

        try {
          await queryFulfilled; // Wait for API response
        } catch {
          patchResult.undo(); // Rollback on failure
        }
      },
    }),
  }),
});

export const {
  useGetAllExamsQuery,
  useLazyGetAllExamsQuery,
  useGetExamQuery,
  useAddExamMutation,
  useUpdateExamMutation,
  useDeleteExamMutation,
} = examApi;
