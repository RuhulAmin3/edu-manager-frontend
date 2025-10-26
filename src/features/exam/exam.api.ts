import { rootApi } from "../../redux/api";
import { ExamType } from "./exam.type";

const examApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all exams
    getAllExams: builder.query({
      query: (params) => ({
        url: "/exam",
        params,
      }),
      providesTags: ["exam"],
    }),

    // Get a single exam
    getExam: builder.query({
      query: (id) => ({
        url: `/exam/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "exam", id }],
    }),
    // Add new exam
    addExam: builder.mutation({
      query: (data) => ({
        url: "/exam",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["exam"], // ✅ matches providesTags
    }),

    // Update exam
    updateExam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/exam/${id}`,
        method: "PATCH",
        body: data,
      }),
      // ✅ matches providesTags
      invalidatesTags: ["exam"],
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          examApi.util.updateQueryData("getAllExams", {}, (draft) => {
            const exam = draft?.find((item: ExamType) => item.id === id);
            if (exam) {
              Object.assign(exam, data);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // Delete exam
    deleteExam: builder.mutation({
      query: (id) => ({
        url: `/exam/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["exam"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          examApi.util.updateQueryData("getAllExams", {}, (draft) => {
            return draft.filter((exam: ExamType) => exam.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
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
