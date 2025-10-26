import { rootApi } from "../../redux/api";
import type {
  StudentListApiResponse,
  StudentApiResponse,
  StudentQueryParams,
  UpdateStudentData,
} from "./student.types";

const studentApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all students
    getAllStudents: builder.query<StudentListApiResponse, StudentQueryParams>({
      query: (params) => ({
        url: "/student",
        params,
      }),
      providesTags: ["student"],
    }),

    // Get a single student
    getStudent: builder.query<StudentApiResponse, string>({
      query: (id) => ({
        url: `/student/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "student", id }],
    }),

    // Update a student
    updateStudent: builder.mutation<
      StudentApiResponse,
      { id: string; data: UpdateStudentData }
    >({
      query: ({ id, data }) => ({
        url: `/student/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: "student", id },
        "student",
      ], // Pessimistic update
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        // Optimistic Update
        const patchResult = dispatch(
          studentApi.util.updateQueryData(
            "getAllStudents",
            {},
            (draft) => {
              const student = draft?.data?.find(
                (item) => item.id === id
              );
              if (student) {
                Object.assign(student, data);
              }
            }
          )
        );

        try {
          await queryFulfilled; // Wait for API response
        } catch {
          patchResult.undo(); // Rollback on failure
        }
      },
    }),

    // Delete a student
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"], // Pessimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistic Update
        const patchResult = dispatch(
          studentApi.util.updateQueryData(
            "getAllStudents",
            {},
            (draft) => {
              return {
                ...draft,
                data: draft?.data?.filter(
                  (student) => student.id !== id
                ),
              };
            }
          )
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
  useGetAllStudentsQuery,
  useLazyGetAllStudentsQuery,
  useGetStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
