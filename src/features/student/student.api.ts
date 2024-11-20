import { rootApi } from "../../redux/api";

const studentApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({

    // Get all students
    getAllStudents: builder.query({
      query: (data) => ({
        url: "/student",
        params: data,
      }),
      providesTags: ["student"],
    }),

    // Get a single student
    getStudent: builder.query({
      query: (id) => ({
        url: `/student/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "student", id }],
    }),

    // Add a student
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/user/student",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["student"], // Pessimistic update
    }),

    // Update a student
    updateStudent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/student/${id}`,
        method: "PATCH",
        body: data,
      }),
      
      invalidatesTags: (result, error, { id }) => [{ type: "student", id }], // Pessimistic update
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {

        // Optimistic Update
        const patchResult = dispatch(
          studentApi.util.updateQueryData("getAllStudents", undefined, (draft) => {
            const student = draft?.find((item: Record<string, unknown>) => item.id === id);
            if (student) {
              Object.assign(student, data);
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
          studentApi.util.updateQueryData("getAllStudents", undefined, (draft) => {
            return draft?.filter((student:Record<string, unknown>) => student.id !== id);
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
  useGetAllStudentsQuery,
  useGetStudentQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
